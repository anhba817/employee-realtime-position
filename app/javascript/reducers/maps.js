import * as mapConstants from "../constants/map";
import { toastError, toastSuccess } from "../common/toastHelper";
import mapImage from '../assets/images/Floor_map.JPEG';

const initialState = [];

const testMaps = [
  {
    id: 1,
    name: "Floor 1",
    img_url: mapImage,
    anchors: [],
    ratio: 0.1,
  },
  {
    id: 2,
    name: "Floor 2",
    img_url: mapImage,
    anchors: [],
    ratio: 0.1,
  },
  {
    id: 3,
    name: "Floor 3",
    img_url: mapImage,
    anchors: [],
    ratio: 0.1,
  },
  {
    id: 4,
    name: "Floor 4",
    img_url: mapImage,
    anchors: [],
    ratio: 0.1,
  },
];

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case mapConstants.GET_MAPS_SUCCESS:
      return testMaps;
    case mapConstants.GET_MAPS_FAILED:
      toastError(action.payload.error);
      return state;
    default:
      return state;
  }
};

export default mapsReducer;
