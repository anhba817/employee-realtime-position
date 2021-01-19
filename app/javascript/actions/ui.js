import * as uiConstants from '../constants/ui';

export const showLoading = () => {
  return {
    type: uiConstants.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: uiConstants.HIDE_LOADING,
  };
};

export const setActiveMapAddingStep = (step) => {
  return {
    type: uiConstants.SET_ACTIVE_ADDING_STEP,
    payload: {
      step,
    },
  };
};
