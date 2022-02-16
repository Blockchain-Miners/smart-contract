import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import ClaimMiner from './ClaimMiner/ClaimMiner';

const ClaimWindow = (props) => {
  const [tokenData, setTokenData] = useState(null);
  const [isTxPending, setIsTxPending] = useState(false);

  const blockchain = useSelector((state) => state.blockchain);

  const selectToken = (tokenId) => {
    setTokenData((prev) =>
      prev.map((token) => (token.token_id === tokenId ? { ...token, isSelected: true } : token)),
    );
  };

  const deSelectToken = (tokenId) => {
    setTokenData((prev) =>
      prev.map((token) => (token.token_id === tokenId ? { ...token, isSelected: false } : token)),
    );
  };

  const getTokenAmount = () => {
    if (tokenData === null) return 0;
    return tokenData.reduce((acc, cur) => acc + (cur.isSelected ? cur.hashToClaim : 0), 0);
  };

  useEffect(() => {
    (async () => {
      if (blockchain.account) {
        setTokenData(null);
        // const CONFIG = await getAppConfig();
        // const options = CONFIG.ASSET_URL.includes('testnets')
        //   ? { method: 'GET' }
        //   : {
        //       method: 'GET',
        //       headers: {
        //         Accept: 'application/json',
        //         'Access-Control-Allow-Origin': window.location.origin,
        //         'X-API-KEY': '237f9688dc824aff8013f21bfa667271',
        //       },
        //     };
        // const allAssets = [];
        // const limit = 50;
        // let maxPage = 0;
        // for (let x = 0; x === maxPage; x++) {
        //   await fetch(
        //     `${CONFIG.ASSET_URL}?owner=${blockchain.account}&asset_contract_addresses=${
        //       CONFIG.ULTRA_MINER_CONTRACT_ADDRESS
        //     }&limit=${limit}&offset=${x * limit}`,
        //     options,
        //   )
        //     .then((data) => data.json())
        //     // eslint-disable-next-line no-loop-func
        //     .then((data) => {
        //       if (data.assets) {
        //         if (data.assets.length === limit) {
        //           maxPage++;
        //         }
        //         allAssets.push(...data.assets);
        //       } else {
        //         alert('Something went wrong loading your UltraMiner assets');
        //       }
        //     })
        //     .catch((error) => {
        //       alert('Something went wrong loading your UltraMiner assets');
        //       console.log('error loading assets', error);
        //     });
        // }
        const allAssets = [];
        try {
          const walletMiners = await blockchain.umSmartContract.methods
            .tokensOfOwner(blockchain.account)
            .call({ from: blockchain.account });
          allAssets.push(
            ...walletMiners.map((a) => ({
              token_id: a,
              image_thumbnail_url: `https://ipfs.io/ipfs/QmZY9Wfa1ytcwkhXymZQ3Kr7mA3pf1tfkfq5q2E8bY7msn/${a}.png`,
            })),
          );
        } catch (e) {}
        for (let x = 0; x < allAssets.length; x++) {
          const etherAmount = await blockchain.hpSmartContract.methods
            .checkUltraDailyReward(allAssets[x].token_id)
            .call({ from: blockchain.account });
          const hAmount = parseInt(Web3.utils.fromWei(etherAmount));
          allAssets[x].hashToClaim = hAmount;
          if (hAmount > 0) {
            allAssets[x].isSelected = true;
          }
        }
        setTokenData(allAssets.sort((a, b) => b.hashToClaim - a.hashToClaim));
      }
    })();
  }, [blockchain]);

  return (
    <div style={{ marginTop: '10px' }} className='headerOutsideBox'>
      <div id='claimWindowHeader'>
        <h3 id='claimWindowHeaderTitle'>Available to claim</h3>
        <div id='claimWindowHeaderAmount'>
          <h3 style={{ fontSize: '25px' }}>{getTokenAmount()}</h3>
        </div>
        <div style={{ display: 'flex', width: '100%', marginTop: '25px' }}>
          <p
            style={{
              fontSize: '15px',
              textDecoration: 'underline',
              margin: '0px 10px 0px 10px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setTokenData((prev) =>
                prev.map((token) =>
                  token.hashToClaim > 0 ? { ...token, isSelected: true } : token,
                ),
              );
            }}
          >
            Select All
          </p>
          <p
            style={{ fontSize: '15px', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => {
              setTokenData((prev) => prev.map((token) => ({ ...token, isSelected: false })));
            }}
          >
            Deselect All
          </p>
        </div>
      </div>
      <div id='claimWindowMiners'>
        {tokenData !== null ? (
          tokenData.map((token) => (
            <ClaimMiner
              key={token.token_id}
              token={token}
              selectToken={selectToken}
              deSelectToken={deSelectToken}
            />
          ))
        ) : (
          <h3 style={{ color: 'yellow' }}>Loading...</h3>
        )}

        {/* Flex line-break for bottom */}
        <div style={{ flexBasis: '100%', height: '100px' }} />
      </div>
      <button
        disabled={
          !blockchain.account ||
          !blockchain.umSmartContract ||
          !tokenData ||
          tokenData.every((token) => !token.isSelected) ||
          isTxPending
        }
        className='headerBoxClaimButton'
        onClick={async (e) => {
          e.preventDefault();
          setIsTxPending(true);
          const assetTokenIds = tokenData.reduce((acc, cur) => {
            if (cur.isSelected) {
              acc.push(cur.token_id);
            }
            return acc;
          }, []);
          try {
            await blockchain.hpSmartContract.methods
              .claimUltraRewards(assetTokenIds)
              .send({ from: blockchain.account });
            setTokenData((prev) =>
              prev.map((token) =>
                assetTokenIds.includes(token.token_id)
                  ? { ...token, hashToClaim: 0, isSelected: false }
                  : { ...token },
              ),
            );
          } catch (e) {
            alert('Something went wrong while claiming, please try again or contact an admin.');
          }
          setIsTxPending(false);
        }}
      >
        <h3>{isTxPending ? 'WAITING FOR TRANSACTION' : 'CLAIM TOKENS'}</h3>
      </button>
    </div>
  );
};

export default ClaimWindow;
