import React, { useState } from 'react';

/**
 * TODO
 * connect burn with smart contract
 * select all, deselect all
 */

const BurnWindow = (props) => {
  const { tokenData, blockchain } = props;
  const [selectedMiners, setSelectedMiners] = useState([]);

  return (
    <div className='headerOutsideBox'>
      <p className='headerBoxTitle'>Select Miners to Burn</p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          overflow: 'scroll',
          overflowY: 'auto',
          height: 'calc(100% - 25px)',
          overflowX: 'hidden',
          backgroundColor: 'rgba(0,0,0,0.7)',
          border: '2px solid yellow',
        }}
      >
        {tokenData.map((token) => (
          <div
            key={token.token_id}
            style={{
              margin: '5px',
              height: '210px',
              width: '210px',
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (selectedMiners.includes(token.token_id)) {
                setSelectedMiners((prev) => prev.filter((val) => token.token_id !== val));
              } else {
                setSelectedMiners((prev) => [...prev, `${token.token_id}`]);
              }
            }}
          >
            <img
              style={{ borderRadius: '5px' }}
              src={token.image_thumbnail_url}
              alt={`${token.name} ${token.token_id}`}
            />
            <div
              className={`miner-burn ${
                selectedMiners.includes(token.token_id) && 'selectedMiner-burn'
              }`}
            >
              <h3
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  color: 'black',
                  bottom: '0',
                  fontSize: '15px',
                  padding: '5px',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '18px',
                    width: '18px',
                    fontSize: '15px',
                    backgroundColor: 'white',
                    border: '1px solid black',
                  }}
                >
                  {selectedMiners.includes(token.token_id) && 'X'}
                </span>
                <span style={{ paddingLeft: '5px' }}>Miner #{token.token_id}</span>
              </h3>
            </div>
          </div>
        ))}
        <div style={{ display: 'block', height: '50px', width: '150px' }} />
      </div>
      <button
        disabled={selectedMiners.length === 0 || selectedMiners.length % 2 !== 0}
        className='headerBoxBurnButton'
        onClick={(e) => {
          e.preventDefault();
          // blockchain.smartContract.methods.burnForUltra();
        }}
      >
        <h3>BURN FOR ULTRA</h3>
      </button>
    </div>
  );
};

export default BurnWindow;
