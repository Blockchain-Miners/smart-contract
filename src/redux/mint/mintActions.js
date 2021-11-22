// log
import store from '../store';

const fetchMintRequest = () => {
	return {
		type: 'CHECK_DATA_REQUEST',
	};
};

const fetchMintSuccess = (payload) => {
	return {
		type: 'CHECK_DATA_SUCCESS',
		payload: payload,
	};
};

const fetchMintFailed = (payload) => {
	return {
		type: 'CHECK_DATA_FAILED',
		payload: payload,
	};
};

export const fetchMint = (account) => {
	return async (dispatch) => {
		dispatch(fetchMintRequest());
		try {
			let mintsAllowed = await store
				.getState()
				.blockchain.smartContract.methods.presaleWhitelist(account)
				.call();
			dispatch(
				fetchMintSuccess({
					mintsAllowed,
				})
			);
		} catch (err) {
			console.log(err);
			dispatch(fetchMintFailed('Could not load data from contract.'));
		}
	};
};
