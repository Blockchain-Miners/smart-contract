const initialState = {
	loading: false,
	presaleWhitelist: 0,
	error: false,
	errorMsg: '',
};

const mintReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CHECK_DATA_REQUEST':
			return {
				...state,
				loading: true,
				error: false,
				errorMsg: '',
			};
		case 'CHECK_DATA_SUCCESS':
			return {
				...state,
				loading: false,
				presaleWhitelist: action.payload.presaleWhitelist,
				// cost: action.payload.cost,
				error: false,
				errorMsg: '',
			};
		case 'CHECK_DATA_FAILED':
			return {
				...initialState,
				loading: false,
				error: true,
				errorMsg: action.payload,
			};
		default:
			return state;
	}
};

export default mintReducer;
