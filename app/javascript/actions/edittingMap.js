import * as mapConstants from "../constants/edittingMap";

export const uploadCurrentMap = (image, name, ratio, width, height) => {
  return {
    type: mapConstants.UPLOAD_MAP,
    payload: {
      image,
      name,
      ratio,
      width,
      height,
    }
  };
};

export const uploadCurrentMapSuccess = (data) => {
  return {
    type: mapConstants.UPLOAD_MAP_SUCCESS,
    payload: {
      data,
    },
  };
};

export const uploadCurrentMapFailed = (error) => {
  return {
    type: mapConstants.UPLOAD_MAP_FAILED,
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

export const deleteAnchorSuccess = (id) => {
  return {
    type: mapConstants.DELETE_ANCHOR_SUCCESS,
    payload: {
      id
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
