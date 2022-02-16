const ClaimMiner = (props) => {
  const { token, selectToken, deSelectToken } = props;

  return (
    <div
      key={token.token_id}
      className='claimWindowMiner'
      onClick={() => {
        if (token.hashToClaim <= 0) {
          return;
        }
        if (!token.isSelected) {
          selectToken(token.token_id);
        } else {
          deSelectToken(token.token_id);
        }
      }}
    >
      <img
        style={{ borderRadius: '5px' }}
        src={token.image_thumbnail_url}
        alt={`${token.token_id}`}
      />

      <span
        style={{
          bottom: 'unset',
          top: '0',
          background: 'yellow',
          height: 'auto',
          minWidth: '50px',
          width: 'auto',
          textAlign: 'center',
          padding: '0 5px',
        }}
        className='miner-claim'
      >
        #{token.token_id}
      </span>

      <div className={`miner-claim ${token.isSelected && 'selectedMiner-claim'}`}>
        <h3 id='claimWindowMinerTextContainer'>
          <span id='claimWindowMinerCheckBox'>{token.isSelected && 'X'}</span>
          <span style={{ paddingLeft: '5px' }}>$HASH {token.hashToClaim}</span>
        </h3>
      </div>
    </div>
  );
};

export default ClaimMiner;
