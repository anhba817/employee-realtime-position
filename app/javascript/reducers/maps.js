import * as mapConstants from "../constants/map";
import { toastError, toastSuccess } from "../common/toastHelper";

const initialState = [];

let tempArr = [];

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case mapConstants.GET_MAPS_SUCCESS:
      return [...action.payload.data];
    case mapConstants.GET_MAPS_FAILED:
      toastError(action.payload.error);
      return state;
    case mapConstants.DELETE_MAP_SUCCESS:
      tempArr = state;
      tempArr = tempArr.filter((map) => map.id !== action.payload.id);
      return [...tempArr];
    case mapConstants.DELETE_MAP_FAILED:
      toastError(action.payload.error);
      return state;
    case mapConstants.ADD_MAP_SUCCESS:
      tempArr = state;
      tempArr.push(action.payload.data);
      return [...tempArr];
    case mapConstants.ADD_MAP_FAILED:
      toastError(action.payload.error);
      return state;
    case mapConstants.UPDATE_MAP_SUCCESS:
      tempArr = state;
      tempArr = tempArr.map((map) =>
        map.id === action.payload.data.id ? action.payload.data : map
      );
      return [...tempArr];
    case mapConstants.UPDATE_MAP_FAILED:
      toastError(action.payload.error);
      return state;
    case mapConstants.ADD_ANCHOR_SUCCESS:
      tempArr = state;
      tempArr = tempArr.map((map) =>
        map.id === action.payload.data.id ? action.payload.data : map
      );
      return [...tempArr];
    case mapConstants.ADD_ANCHOR_FAILED:
      toastError(action.payload.error);
      return state;
    case mapConstants.UPDATE_ANCHOR_SUCCESS:
      tempArr = state;
      tempArr = tempArr.map((map) => {
        if (map.id !== action.payload.data.map_id) {
          return map;
        }
        let anchorArr = map.anchors;
        anchorArr = anchorArr.map((anchor) =>
          anchor.id !== action.payload.data.id ? anchor : action.payload.data
        );
        return {
          ...map,
          anchors: [...anchorArr],
        };
      });
      return [...tempArr];
    case mapConstants.UPDATE_ANCHOR_FAILED:
      toastError(action.payload.error);
      return state;
    case mapConstants.DELETE_ANCHOR_SUCCESS:
      tempArr = state;
      tempArr = tempArr.map((map) => {
        if (map.id !== action.payload.mapId) {
          return map;
        }
        let anchorArr = map.anchors;
        anchorArr = anchorArr.filter(
          (anchor) => anchor.id !== action.payload.id
        );
        return {
          ...map,
          anchors: [...anchorArr],
        };
      });
      return [...tempArr];
    case mapConstants.DELETE_ANCHOR_FAILED:
      toastError(action.payload.error);
      return state;
    default:
      return state;
  }
};

export default mapsReducer;
