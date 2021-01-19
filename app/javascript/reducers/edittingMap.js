import * as edittingMapConstants from "../constants/edittingMap";
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

const uploadingMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case edittingMapConstants.UPLOAD_MAP_SUCCESS:
      return {
        ...state,
        id: action.payload.data.id,
        name: action.payload.data.name,
        ratio: action.payload.data.ratio,
        width: action.payload.data.width,
        height: action.payload.data.height,
        image: action.payload.data.image,
        anchors: action.payload.data.anchors,
      };
    case edittingMapConstants.UPLOAD_MAP_FAILED:
      toastError(action.payload.error);
      return {
        ...state,
      };
    case edittingMapConstants.ADD_ANCHOR_SUCCESS:
      return {
        ...state,
        anchors: [...action.payload.data.anchors],
      };
    case edittingMapConstants.ADD_ANCHOR_FAILED:
      toastError(action.payload.error);
      return {
        ...state,
      };
    case edittingMapConstants.UPDATE_ANCHOR_SUCCESS:
      console.log(action.payload.data);
      return {
        ...state,
      };
    case edittingMapConstants.UPDATE_ANCHOR_FAILED:
      toastError(action.payload.error);
      return {
        ...state,
      };
    case edittingMapConstants.DELETE_ANCHOR_SUCCESS:
      tmpAnchors = state.anchors;
      tmpAnchors = tmpAnchors.filter(anchor => anchor.id !== action.payload.id);
      return {
        ...state,
        anchors: tmpAnchors,
      };
    case edittingMapConstants.DELETE_ANCHOR_FAILED:
      toastError(action.payload.error);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default uploadingMapReducer;
