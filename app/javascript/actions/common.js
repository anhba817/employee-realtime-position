import commonConstants from "../constants/common";

export const setCrsfToken = (token) => {
  return {
    type: commonConstants.SET_CSRF_TOKEN,
    payload: {
      token,
    },
  };
};

export const clearCrsfToken = () => {
  return {
    type: commonConstants.CLEAR_CSRF_TOKEN,
  };
};
