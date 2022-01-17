import React, { useState } from 'react';

/**
 * TODO
 * connect burn with smart contract
 */

const BurnWindow = (props) => {
  const { tokenData, blockchain } = props;
  const [selectedMiners, setSelectedMiners] = useState([]);

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
              <h3 id='burnWindowMinerTextContainer'>
                <span id='burnWindowMinerCheckBox'>
                  {selectedMiners.includes(token.token_id) && 'X'}
                </span>
                <span style={{ paddingLeft: '5px' }}>Miner #{token.token_id}</span>
              </h3>
            </div>
          </div>
        ))}

        {/* Padding for bottom */}
        <div style={{ flexBasis: '100%', height: '50px' }} />
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
