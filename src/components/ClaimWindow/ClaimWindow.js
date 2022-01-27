import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ClaimWindow = (props) => {
  const { setTokenData } = props;
  const [isClaimButtonDisabled, setIsClaimButtonDisabled] = useState(false);
  const [tokensOfOwner, setTokensOfOwner] = useState(null); // Loading when null

  const blockchain = useSelector((state) => state.blockchain);

  useEffect(() => {
    (async () => {
      if (blockchain.account && blockchain.umSmartContract) {
        try {
          const tokensOfOwner = await blockchain.umSmartContract.methods
            .tokensOfOwner(blockchain.account)
            .send({ from: blockchain.account });
          setTokensOfOwner(tokensOfOwner);
        } catch (e) {
          setTokensOfOwner([]);
        }
      }
    })();
  }, [blockchain]);

  return (
    <div className='headerOutsideBox'>
      <div id='claimWindowHeader'>
        <p id='claimWindowHeaderTitle'>Claim your tokens</p>
        <div style={{ height: '50px', width: '70%', borderRadius: '15px' }}>TOKEN BOX HERE</div>
        <h3 style={{ textAlign: 'center' }}>Available to claim</h3>
      </div>
      <div id='claimWindowMiners'>
        {tokensOfOwner !== null &&
          tokensOfOwner.map((token) => (
            <div key={token.token_id} className='claimWindowMiner'>
              <img
                style={{ borderRadius: '5px' }}
                src={token.image_thumbnail_url}
                alt={`${token.name} ${token.token_id}`}
              />
            </div>
          ))}

        {/* Flex line-break for bottom */}
        <div style={{ flexBasis: '100%', height: '100px' }} />
      </div>
      <button
        disabled={!blockchain.account || !blockchain.umSmartContract || isClaimButtonDisabled}
        className='headerBoxClaimButton'
        onClick={async (e) => {
          e.preventDefault();
        }}
      >
        <h3>CLAIM TOKENS</h3>
      </button>
    </div>
  );
};

export default ClaimWindow;
