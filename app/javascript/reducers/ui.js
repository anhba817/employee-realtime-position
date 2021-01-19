import * as uiConstants from "../constants/ui";

const initialState = {
  showLoading: false,
  activeMapAddingStep: 0,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case uiConstants.SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
      };
    case uiConstants.HIDE_LOADING:
      return {
        ...state,
        showLoading: false,
      };
    case uiConstants.SET_ACTIVE_ADDING_STEP:
      return {
        ...state,
        activeMapAddingStep: action.payload.step,
      };
    default:
      return state;
  }
};

export default uiReducer;
