import * as commonConstants from "../constants/common";

const initialState = {
  token: "",
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case commonConstants.SET_CSRF_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case commonConstants.CLEAR_CSRF_TOKEN:
      return {
        ...state,
        token: "",
      };
    default:
      return state;
  }
};

export default commonReducer;
