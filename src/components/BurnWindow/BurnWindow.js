import React, { useEffect, useState } from 'react';

const BurnWindow = (props) => {
  const { tokenData, blockchain, setTokenData } = props;
  const [selectedMiners, setSelectedMiners] = useState([]);
  const [isBmcUserApproved, setIsBmcUserApproved] = useState(false);

  const isTokenSelected = (tokenId) => {
    return selectedMiners.includes(tokenId);
  };

  useEffect(() => {
    (async () => {
      if (blockchain.account && blockchain.umSmartContract) {
        const isUserApproved = await blockchain.umSmartContract.methods
          .getBmcApprovalStatus(blockchain.account)
          .call({ from: blockchain.account });
        setIsBmcUserApproved(isUserApproved);
      }
    })();
  }, [blockchain]);

  return (
    <div className='headerOutsideBox'>
      <div id='burnWindowHeader'>
        <p id='burnWindowHeaderTitle'>Select Miners to Burn</p>
        <p
          className='burnWindowHeaderUtil'
          onClick={() => setSelectedMiners(tokenData.map((token) => `${token.token_id}`))}
        >
          Select All
        </p>
        <p className='burnWindowHeaderUtil' onClick={() => setSelectedMiners([])}>
          Clear All
        </p>
      </div>
      <div id='burnWindowMiners'>
        {tokenData.map((token) => (
          <div
            key={token.token_id}
            className='burnWindowMiner'
            onClick={() => {
              if (isTokenSelected(token.token_id)) {
                setSelectedMiners((prev) => prev.filter((tokenId) => token.token_id !== tokenId));
              } else {
                setSelectedMiners((prev) => [...prev, token.token_id]);
              }
            }}
          >
            <img
              style={{ borderRadius: '5px' }}
              src={token.image_thumbnail_url}
              alt={`${token.name} ${token.token_id}`}
            />
            <div
              className={`miner-burn ${isTokenSelected(token.token_id) && 'selectedMiner-burn'}`}
            >
              <h3 id='burnWindowMinerTextContainer'>
                <span id='burnWindowMinerCheckBox'>{isTokenSelected(token.token_id) && 'X'}</span>
                <span style={{ paddingLeft: '5px' }}>Miner #{token.token_id}</span>
              </h3>
            </div>
          </div>
        ))}

        {/* Padding for bottom */}
        <div style={{ flexBasis: '100%', height: '50px' }} />
      </div>
      <button
        disabled={
          (selectedMiners.length === 0 || selectedMiners.length % 2 !== 0) &&
          blockchain.account &&
          blockchain.emSmartContract
        }
        className='headerBoxBurnButton'
        onClick={async (e) => {
          e.preventDefault();
          const configResponse = await fetch('/config/config.json', {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          const CONFIG = await configResponse.json();
          const UM_CONTRACT_ADDRESS = CONFIG.ULTRA_MINER_CONTRACT_ADDRESS;

          if (!isBmcUserApproved) {
            const approval = true;
            const totalGasLimited = await blockchain.umSmartContract.methods
              .setApprovalForAll(UM_CONTRACT_ADDRESS, approval)
              .estimateGas({ from: blockchain.account, value: 0 });
            await blockchain.umSmartContract.methods
              .setApprovalForAll(UM_CONTRACT_ADDRESS, approval)
              .send({
                from: blockchain.account,
                gasLimit: String(Math.floor(parseInt(totalGasLimited * CONFIG.ADJUST_GAS))),
              })
              .then(() => {
                setIsBmcUserApproved(true);
              })
              .catch((error) => {
                alert('Something went wrong while approving, please contact an admin.');
                console.log('approve failed error:', error);
              });
            return;
          }

          const uintMiners = selectedMiners.map((tokenId) => parseInt(tokenId));

          const totalGasLimited = await blockchain.umSmartContract.methods
            .synthesizeManyUltraminers(uintMiners)
            .estimateGas({ from: blockchain.account, value: 0 });

          blockchain.umSmartContract.methods
            .synthesizeManyUltraminers(uintMiners)
            .send({
              from: blockchain.account,
              to: UM_CONTRACT_ADDRESS,
              gasLimit: String(Math.floor(parseInt(totalGasLimited * CONFIG.ADJUST_GAS))),
            })
            .then((data) => {
              setTokenData((prev) => prev.filter((token) => !isTokenSelected(token.token_id)));
              return data;
            })
            .catch((error) => {
              alert('Something went wrong while burning, please contact an admin.');
              console.log('burn failed error:', error);
            });
        }}
      >
        <h3>{isBmcUserApproved ? 'BURN FOR ULTRA' : 'APPROVE FOR ULTRA BURN'}</h3>
      </button>
    </div>
  );
};

export default BurnWindow;
