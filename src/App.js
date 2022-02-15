import axios from 'axios';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Web3 from 'web3';
import './App.scss';
import Claim from './components/pages/Claim/Claim';
import Home from './components/pages/Home';
import { useCoinContext } from './contexts/CoinContext';

function App() {
  const [coinData, setCoinData] = useCoinContext();
  useEffect(() => {
    (async () => {
      try {
        const [btcData, ethData, btcWalletData, ethWalletData] = await Promise.all([
          axios.get('https://api.blockchain.com/v3/exchange/tickers/BTC-USD'),
          axios.get('https://api.blockchain.com/v3/exchange/tickers/ETH-USD'),
          axios.get(
            'https://api.blockcypher.com/v1/btc/main/addrs/bc1qzv8m2dswep9uf02zxrhzv7vwr52f7a0lm2jzmq/balance',
          ),
          axios.get(
            'https://api.blockcypher.com/v1/eth/main/addrs/0xe1f124cB6b70230516377dBA17Ca6A63C44FC275/balance',
          ),
        ]);
        const btc = btcData.data;
        const eth = ethData.data;

        btc.walletAmount = (btcWalletData.data.final_balance / 100000000).toFixed(3);
        eth.walletAmount = Web3.utils.fromWei(ethWalletData.data.final_balance.toString());
        setCoinData({ eth: eth, btc: btc });
      } catch (err) {}
    })();
  }, [setCoinData]);

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/claim'>
          <Claim />
        </Route>
      </Switch>
    </>
  );
}

export default App;
