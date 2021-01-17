import * as uploadingMapConstants from "../constants/uploadingMap";
import { toastError, toastSuccess } from "../common/toastHelper";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  name: "",
  ratio: 1.0,
  size: [0, 0],
  image: null,
  anchors: [],
};

let tmpAnchors = [];

const uploadingMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case uploadingMapConstants.SET_UPLOADING_MAP:
      return {
        ...state,
        image: action.payload.image,
      };
    case uploadingMapConstants.SET_UPLOADING_MAP_SIZE:
      return {
        ...state,
        size: [action.payload.width, action.payload.height],
      };
    case uploadingMapConstants.SET_UPLOADING_MAP_NAME_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
      };
    case uploadingMapConstants.SET_UPLOADING_MAP_RATIO_SUCCESS:
      return {
        ...state,
        ratio: action.payload.ratio,
      };
    case uploadingMapConstants.CLEAR_UPLOADING_MAP:
      return {
        ...state,
        image: null,
        size: [0, 0],
        anchors: [],
      };
    case uploadingMapConstants.ADD_NEW_ANCHOR:
      tmpAnchors = state.anchors;
      tmpAnchors = tmpAnchors.filter(
        (anchor) => anchor.anchorId !== action.payload.anchorId
      );
      tmpAnchors.push({
        id: uuidv4(),
        anchorId: action.payload.anchorId,
        x: action.payload.x,
        y: action.payload.y,
      });
      return {
        ...state,
        anchors: [...tmpAnchors],
      };
    case uploadingMapConstants.UPDATE_NEW_ANCHOR_SUCCESS:
      if (
        action.payload.x < 0 ||
        action.payload.y < 0 ||
        action.payload.x > state.size[0] ||
        action.payload.y > state.size[1]
      ) {
        toastError("Anchor should state inside Map");
        return state;
      }
      tmpAnchors = state.anchors;
      tmpAnchors = tmpAnchors.map((anchor) =>
        anchor.id === action.payload.id
          ? {
              ...anchor,
              anchorId: action.payload.anchorId,
              x: action.payload.x,
              y: action.payload.y,
            }
          : anchor
      );
      return {
        ...state,
        anchors: [...tmpAnchors],
      };
    case uploadingMapConstants.DELETE_NEW_ANCHOR:
      tmpAnchors = state.anchors;
      tmpAnchors = tmpAnchors.filter(
        (anchor) => anchor.id !== action.payload.id
      );
      return {
        ...state,
        anchors: [...tmpAnchors],
      };
    case uploadingMapConstants.CLEAR_NEW_ANCHORS:
      return {
        ...state,
        anchors: [],
      };
    default:
      return state;
  }
};

export default uploadingMapReducer;
