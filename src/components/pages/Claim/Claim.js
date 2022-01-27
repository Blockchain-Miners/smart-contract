import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import bmcLogo from '../../../assets/bcm-logo.png';
import minerLogo from '../../../assets/bm-logo-64.png';
import burnImg from '../../../assets/BURN.png';
import claimHashSvg from '../../../assets/svg/claim-hash.svg';
import { connect } from '../../../redux/blockchain/blockchainActions';
import { fetchData } from '../../../redux/data/dataActions';
import Footer from '../../blockComponent/Footer';
import ClaimWindow from '../../ClaimWindow/ClaimWindow';

const hashDisplay = '1000';

function Claim() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  const [tokenData, setTokenData] = useState([]);

  const getData = () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <>
      <div className='mainContainer burnPage'>
        <div className='headerBoxTopM'>
          <div className='righBoxTop'>
            <img src={minerLogo} alt='BMC Logo' className='bmcLogo' />
            <div className='hashDisplay'>
              {blockchain.account === '' || blockchain.smartContract === null ? (
                <div className='connectBox'>
                  <button
                    className='btnConnect'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                  >
                    Connect wallet
                  </button>
                  {blockchain.errorMsg !== '' ? (
                    <>
                      <h4>{blockchain.errorMsg}</h4>
                    </>
                  ) : null}
                </div>
              ) : (
                <h3>$HASH {hashDisplay}</h3>
              )}
              <h3>$HASH {hashDisplay}</h3>
            </div>
          </div>
        </div>
        <header>
          <div className='headerBoxTop'>
            <Link to='/'>
              <img src={bmcLogo} alt='BMC Logo' className='bmcLogo' />
            </Link>

            <div className='righBoxTop'>
              <NavLink to='/burn' style={{ marginRight: '10px' }}>
                <img src={burnImg} alt='Burn' />
              </NavLink>
              <div className='hashDisplay'>
                {blockchain.account === '' || blockchain.smartContract === null ? (
                  <div className='connectBox'>
                    <button
                      className='btnConnect'
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      <h3>Connect wallet</h3>
                    </button>
                    {blockchain.errorMsg !== '' ? (
                      <>
                        <h4>{blockchain.errorMsg}</h4>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  // <h3>$HASH {hashDisplay}</h3>
                  <h3>Connected</h3>
                )}
              </div>
            </div>
          </div>
          <div className='headerBoxBottom'>
            <img src={claimHashSvg} alt='Claim $hash' />
            <ClaimWindow tokenData={tokenData} setTokenData={setTokenData} />
            {(blockchain.account === '' || blockchain.smartContract === null) && (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  getData();
                }}
              >
                Connect Wallet
              </a>
            )}
          </div>
        </header>
        <Footer />
      </div>
    </>
  );
}

export default Claim;
