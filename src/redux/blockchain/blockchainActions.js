// constants
import Web3 from 'web3';
import Web3EthContract from 'web3-eth-contract';
import { getAppConfig, getHashPowerAbi, getOgBmcAbi, getUltraMinerAbi } from '../../service/config';
// log
import { fetchData } from '../data/dataActions';

const connectRequest = () => {
  return {
    type: 'CONNECTION_REQUEST',
  };
};

const connectSuccess = (payload) => {
  return {
    type: 'CONNECTION_SUCCESS',
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: 'CONNECTION_FAILED',
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const abi = await getOgBmcAbi();
    const umAbi = await getUltraMinerAbi();
    const hpAbi = await getHashPowerAbi();
    const CONFIG = await getAppConfig();
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      alert('attempting to get account');
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        alert('got account');
        const networkId = await ethereum.request({
          method: 'net_version',
        });
        if (networkId === String(CONFIG.NETWORK.ID)) {
          const SmartContractObj = new Web3EthContract(abi, CONFIG.CONTRACT_ADDRESS);
          const UltraMinerSmartContractObj = new Web3EthContract(
            umAbi,
            CONFIG.ULTRA_MINER_CONTRACT_ADDRESS,
          );
          const HashPowerSmartContractObj = new Web3EthContract(
            hpAbi,
            CONFIG.HASH_POWER_CONTRACT_ADDRESS,
          );
          const HashSmartContractObj = new Web3EthContract(
            hpAbi,
            CONFIG.HASH_TOKEN.CONTRACT_ADDRESS,
          );
          const hashAmount = await HashSmartContractObj.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] });
          dispatch(
            connectSuccess({
              account: accounts[0],
              userData: {
                hashToken: { amountWei: hashAmount, amountTotal: Web3.utils.fromWei(hashAmount) },
              },
              smartContract: SmartContractObj,
              umSmartContract: UltraMinerSmartContractObj,
              hpSmartContract: HashPowerSmartContractObj,
              web3: web3,
            }),
          );
          // Add listeners start
          ethereum.on('accountsChanged', (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on('chainChanged', () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          alert(`err on network ${CONFIG.NETWORK.NAME}`);
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
        }
      } catch (err) {
        alert('something random went wrong');
        dispatch(connectFailed('Something went wrong.'));
      }
    } else {
      alert('no metamask');
      dispatch(connectFailed('Install Metamask.'));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
