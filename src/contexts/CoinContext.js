import { createContext, useContext, useState } from 'react';

const initialValue = {
  eth: { walletAmount: 0, last_trade_price: 0 },
  btc: { walletAmount: 0, last_trade_price: 0 },
};

const CoinContext = createContext(initialValue);

export const CoinContextProvider = ({ children }) => {
  const [coinData, setCoinData] = useState(initialValue);
  return <CoinContext.Provider value={[coinData, setCoinData]}>{children}</CoinContext.Provider>;
};

export const useCoinContext = () => {
  const coinContext = useContext(CoinContext);

  if (coinContext === null || coinContext === undefined) {
    throw new Error('Coin context must be used within a coin context provider');
  }

  return coinContext;
};
