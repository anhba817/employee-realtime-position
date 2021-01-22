import * as edittingMapConstants from "../constants/edittingMap";
import * as mapConstants from "../constants/map";
import { toastError, toastSuccess } from "../common/toastHelper";

const initialState = {
  id: "",
  name: "",
  ratio: 1.0,
  width: 0,
  height: 0,
  image: null,
  anchors: [],
};

let tmpAnchors = [];

const edittingMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case edittingMapConstants.SET_EDITTING_MAP:
      return {
        ...action.payload.map,
      };
    case edittingMapConstants.CLEAR_EDITTING_MAP:
      return { ...initialState };
    case edittingMapConstants.GET_AND_SET_EDITTING_MAP_SUCCESS:
      return {
        ...action.payload.data,
      };
    case edittingMapConstants.GET_AND_SET_EDITTING_FAILED:
      toastError(action.payload.error);
      return {
        ...state,
      };
    case mapConstants.ADD_ANCHOR_SUCCESS:
      return {
        ...action.payload.data,
      };
    case mapConstants.DELETE_ANCHOR_SUCCESS:
      tmpAnchors = state.anchors;
      tmpAnchors = tmpAnchors.filter(
        (anchor) => anchor.id !== action.payload.id
      );
      return {
        ...state,
        anchors: [...tmpAnchors],
      };
    case mapConstants.UPDATE_ANCHOR_SUCCESS:
      tmpAnchors = state.anchors;
      tmpAnchors = tmpAnchors.map((anchor) =>
        anchor.id !== action.payload.data.id ? anchor : action.payload.data
      );
      return {
        ...state,
        anchors: [...tmpAnchors],
      };
    default:
      return state;
  }
};

export default edittingMapReducer;
