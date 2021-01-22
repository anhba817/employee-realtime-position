import * as mapConstants from "../constants/edittingMap";

export const setEdittingMap = (map) => {
  return {
    type: mapConstants.SET_EDITTING_MAP,
    payload: {
      map,
    },
  };
};

export const clearEdittingMap = () => {
  return {
    type: mapConstants.CLEAR_EDITTING_MAP,
  };
};

export const getAndSetEditingMap = (id) => {
  return {
    type: mapConstants.GET_AND_SET_EDITTING_MAP,
    payload: {
      id,
    },
  };
};

export const getAndSetEditingMapSuccess = (data) => {
  return {
    type: mapConstants.GET_AND_SET_EDITTING_MAP_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getAndSetEditingMapFailed = (error) => {
  return {
    type: mapConstants.GET_AND_SET_EDITTING_FAILED,
    payload: {
      error,
    },
  };
};
