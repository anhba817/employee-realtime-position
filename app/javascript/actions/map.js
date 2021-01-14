import * as mapConstants from "../constants/map";

export const getAllMaps = () => {
  return {
    type: mapConstants.GET_MAPS,
  };
};

export const getMapsSuccess = (data) => {
  return {
    type: mapConstants.GET_MAPS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getMapsFailed = (error) => {
  return {
    type: mapConstants.GET_MAPS_FAILED,
    payload: {
      error,
    },
  };
};
