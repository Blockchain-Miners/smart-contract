import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import NumberFormat from 'react-number-format';
import bmcLogo from '../../assets/bcm-logo.png';
import minerLogo from '../../assets/bm-logo-64.png';
import burnForUltra from '../../assets/desktop/BurnForUltra.png';
import useMediaQuery from '../../hooks/useMediaQuery';
import { connect } from '../../redux/blockchain/blockchainActions';
import { fetchData } from '../../redux/data/dataActions';
import Footer from '../blockComponent/Footer';
import BurnWindow from '../BurnWindow/BurnWindow';

function Burn() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  const [tokenData, setTokenData] = useState([]);
  const [isBurnAlive, setIsBurnAlive] = useState(null);

  useEffect(() => {
    if (blockchain.account && blockchain.umSmartContract) {
      blockchain.umSmartContract.methods
        .getSynthesizerState()
        .call({ from: blockchain.account })
        .then((data) => {
          setIsBurnAlive(data);
        })
        .catch((error) => {
          alert('An error occured getting burn date, please refresh.');
          console.log('error grabbing synthesizer state', error);
        });
    }
  }, [blockchain]);

  // Burning page useState
  const hashDisplay = '9,410';

  // query by function
  const isdesktop = useMediaQuery('(max-width: 600px)');

  // BMC original page
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: '',
    SCAN_LINK: '',
    NETWORK: {
      NAME: '',
      SYMBOL: '',
      ID: 0,
    },
    NFT_NAME: '',
    SYMBOL: '',
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: '',
    MARKETPLACE_LINK: '',
    SHOW_BACKGROUND: false,
  });

  useEffect(() => {
    (async () => {
      if (blockchain.account) {
        const configResponse = await fetch('/config/config.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const CONFIG = await configResponse.json();
        const options = CONFIG.BASE_ASSET_URL.includes('testnets')
          ? { method: 'GET' }
          : {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'X-API-KEY': '237f9688dc824aff8013f21bfa667271',
              },
            };
        fetch(
          `${CONFIG.BASE_ASSET_URL}?owner=${blockchain.account}&asset_contract_addresses=${CONFIG.CONTRACT_ADDRESS}&limit=50`,
          options,
        )
          .then((data) => data.json())
          .then((data) => {
            if (data.assets) {
              setTokenData(data.assets);
            } else {
              alert('Something went wrong loading your BMC assets');
            }
          })
          .catch((error) => {
            alert('Something went wrong loading your BMC assets');
            console.log('error loading assets', error);
          });
      }
    })();
  }, [blockchain]);
  // const data = useSelector((state) => state.data);
  // const dataT = useSelector((state) => state?.mint);
  // const [claimingNft, setClaimingNft] = useState(false);
  // const [feedback, setFeedback] = useState(`Public Mint`);
  // const [mintAmount, setMintAmount] = useState(1);

  //  BMC original mint function

  // const claimNFTs = async () => {
  // 	let cost = CONFIG.WEI_COST;
  // 	let gasLimit = CONFIG.GAS_LIMIT;
  // 	let totalCostWei = String(cost * mintAmount);
  // 	let totalGasLimited = await blockchain.smartContract.methods
  // 		.mint(mintAmount)
  // 		.estimateGas({ from: blockchain.account, value: totalCostWei });
  // 	let totalGasLimit = Math.floor(parseInt(totalGasLimited * 1.3));
  // 	// console.log('Cost: ', totalCostWei);
  // 	// console.log('Gas limit: ', totalGasLimit);
  // 	setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
  // 	setClaimingNft(true);
  // 	blockchain.smartContract.methods.mint(mintAmount);
  // 	blockchain.smartContract.methods
  // 		.mint(mintAmount)
  // 		.send({
  // 			gasLimit: String(totalGasLimit),
  // 			to: CONFIG.CONTRACT_ADDRESS,
  // 			from: blockchain.account,
  // 			value: totalCostWei,
  // 		})
  // 		.once('error', (err) => {
  // 			console.log(err);
  // 			setFeedback('Error minting please contact admin.');
  // 			setClaimingNft(false);
  // 		})
  // 		.then((receipt) => {
  // 			console.log(receipt);
  // 			setFeedback(
  // 				`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
  // 			);
  // 			setClaimingNft(false);
  // 			dispatch(fetchData(blockchain.account));
  // 		});
  // };

  // const decrementMintAmount = () => {
  // 	let newMintAmount = mintAmount - 1;
  // 	if (newMintAmount < 1) {
  // 		newMintAmount = 1;
  // 	}
  // 	setMintAmount(newMintAmount);
  // };

  // const incrementMintAmount = () => {
  // 	let newMintAmount = mintAmount + 1;
  // 	if (newMintAmount > 8) {
  // 		newMintAmount = 8;
  // 	}
  // 	setMintAmount(newMintAmount);
  // };

  const getConfig = async () => {
    const configResponse = await fetch('/config/config.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  // const getMint = () => {
  // 	if (blockchain.account !== '' && blockchain.smartContract !== null) {
  // 		dispatch(fetchMint(blockchain.account));
  // 	}
  // };

  const getData = () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  // END BMC original mint function
  useEffect(() => {
    getConfig();
    getData();
  }, [blockchain.account]);

  return (
    <>
      <div className='mainContainer burnPage' isdesktop={isdesktop}>
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
            <img src={burnForUltra} alt='Burn for ultra' />
            {blockchain.account === '' || blockchain.smartContract === null ? (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  getData();
                }}
              >
                Connect Wallet
              </a>
            ) : isBurnAlive ? (
              <BurnWindow
                tokenData={tokenData}
                blockchain={blockchain}
                setTokenData={setTokenData}
              />
            ) : isBurnAlive === null ? (
              <h3>Loading...</h3>
            ) : (
              <div id='burnUltraLock'>
                <h3 style={{ textAlign: 'center' }}>
                  Burning for Ultra Miners will happen on <span>01/18/2022 at 6:00PM PST</span>
                </h3>
              </div>
            )}
          </div>
        </header>
        <Footer />
      </div>
    </>
  );
}

export default Burn;
