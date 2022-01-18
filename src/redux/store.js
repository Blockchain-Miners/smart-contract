import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import blockchainReducer from './blockchain/blockchainReducer';
import dataReducer from './data/dataReducer';
import mintReducer from './whiteList/mintReducer';

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
  mint: mintReducer,
});

const middleware = [thunk];
const composeEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
