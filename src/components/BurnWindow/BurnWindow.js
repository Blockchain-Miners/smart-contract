import React, { useEffect, useState } from 'react';

const BurnWindow = (props) => {
  const { tokenData, blockchain, setTokenData } = props;
  const [selectedMiners, setSelectedMiners] = useState([]);
  const [isBmcUserApproved, setIsBmcUserApproved] = useState(null);
  const [isBurnButtonDisabled, setIsBurnButtonDisabled] = useState(false);
  const [isApproveButtonDisabled, setIsApproveButtonDisabled] = useState(false);

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

        {/* Flex line-break for bottom */}
        <div style={{ flexBasis: '100%', height: '100px' }} />
      </div>
      {isBmcUserApproved ? (
        <button
          disabled={
            selectedMiners.length === 0 ||
            selectedMiners.length % 2 !== 0 ||
            !blockchain.account ||
            !blockchain.umSmartContract ||
            isBurnButtonDisabled
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

            const uintMiners = selectedMiners.map((tokenId) => parseInt(tokenId));

            const totalGasLimited = await blockchain.umSmartContract.methods
              .synthesizeManyUltraminers(uintMiners)
              .estimateGas({ from: blockchain.account, value: 0 });

            setIsBurnButtonDisabled(true);
            blockchain.umSmartContract.methods
              .synthesizeManyUltraminers(uintMiners)
              .send({
                from: blockchain.account,
                to: CONFIG.ULTRA_MINER_CONTRACT_ADDRESS,
                gasLimit: String(Math.floor(parseInt(totalGasLimited * CONFIG.ADJUST_GAS))),
              })
              .then((data) => {
                setIsBurnButtonDisabled(false);
                setSelectedMiners([]);
                setTokenData((prev) => prev.filter((token) => !isTokenSelected(token.token_id)));
                return data;
              })
              .catch((error) => {
                setIsBurnButtonDisabled(false);
                alert('Something went wrong while burning, please try again or contact an admin.');
                console.log('burn failed error:', error);
              });
          }}
        >
          {isBurnButtonDisabled ? <h3>WAITING FOR TRANSACTION</h3> : <h3>BURN FOR ULTRA</h3>}
        </button>
      ) : (
        isBmcUserApproved !== null && (
          <button
            disabled={isApproveButtonDisabled}
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

              setIsApproveButtonDisabled(true);
              await blockchain.smartContract.methods
                .setApprovalForAll(CONFIG.ULTRA_MINER_CONTRACT_ADDRESS, true)
                .send({
                  from: blockchain.account,
                })
                .then(() => {
                  setIsApproveButtonDisabled(false);
                  setIsBmcUserApproved(true);
                })
                .catch((error) => {
                  setIsApproveButtonDisabled(false);
                  alert(
                    'Something went wrong while approving, please try again or contact an admin.',
                  );
                  console.log('approve failed error:', error);
                });
            }}
          >
            {isApproveButtonDisabled ? (
              <h3>WAITING FOR TRANSACTION</h3>
            ) : (
              <h3>APPROVE FOR ULTRA BURN</h3>
            )}
          </button>
        )
      )}
    </div>
  );
};

export default BurnWindow;
