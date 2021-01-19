import * as mapConstants from "../constants/map";
import { toastError, toastSuccess } from "../common/toastHelper";

const initialState = [];

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case mapConstants.GET_MAPS_SUCCESS:
      return [...action.payload.data];
    case mapConstants.GET_MAPS_FAILED:
      toastError(action.payload.error);
      return state;
    default:
      return state;
  }
};

export default mapsReducer;
