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

export const updateMap = (id, data) => {
  return {
    type: mapConstants.UPDATE_MAP,
    payload: {
      id,
      data,
    },
  };
};

export const updateMapSuccess = (data) => {
  return {
    type: mapConstants.UPDATE_MAP_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateMapFailed = (error) => {
  return {
    type: mapConstants.UPDATE_MAP_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteMap = (id) => {
  return {
    type: mapConstants.DELETE_MAP,
    payload: {
      id,
    },
  };
};

export const deleteMapSuccess = (id) => {
  return {
    type: mapConstants.DELETE_MAP_SUCCESS,
    payload: {
      id,
    },
  };
};

export const deleteMapFailed = (error) => {
  return {
    type: mapConstants.DELETE_MAP_FAILED,
    payload: {
      error,
    },
  };
};


export const addMap = (image, name, ratio, width, height) => {
  return {
    type: mapConstants.ADD_MAP,
    payload: {
      image,
      name,
      ratio,
      width,
      height,
    },
  };
};

export const addMapSuccess = (data) => {
  return {
    type: mapConstants.ADD_MAP_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addMapFailed = (error) => {
  return {
    type: mapConstants.ADD_MAP_FAILED,
    payload: {
      error,
    },
  };
};

export const addAnchor = ({ mapId, deviceId, x, y }) => {
  return {
    type: mapConstants.ADD_ANCHOR,
    payload: {
      mapId,
      deviceId,
      x,
      y,
    },
  };
};

export const addAnchorSuccess = (data) => {
  return {
    type: mapConstants.ADD_ANCHOR_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addAnchorFailed = (error) => {
  return {
    type: mapConstants.ADD_ANCHOR_FAILED,
    payload: {
      error,
    },
  };
};

export const updateAnchor = ({ mapId, id, deviceId, x, y }) => {
  return {
    type: mapConstants.UPDATE_ANCHOR,
    payload: {
      mapId,
      id,
      deviceId,
      x,
      y,
    },
  };
};

export const updateAnchorSuccess = (data) => {
  return {
    type: mapConstants.UPDATE_ANCHOR_SUCCESS,
    payload: {
      data
    },
  };
};

export const updateAnchorFailed = (error) => {
  return {
    type: mapConstants.UPDATE_ANCHOR_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteAnchor = (mapId, id) => {
  return {
    type: mapConstants.DELETE_ANCHOR,
    payload: {
      mapId,
      id,
    },
  };
};

export const deleteAnchorSuccess = (mapId, id) => {
  return {
    type: mapConstants.DELETE_ANCHOR_SUCCESS,
    payload: {
      mapId,
      id,
    },
  };
};

export const deleteAnchorFailed = (error) => {
  return {
    type: mapConstants.DELETE_ANCHOR_FAILED,
    payload: {
      error,
    },
  };
};
