import * as mapConstants from "../constants/uploadingMap";

export const setUploadingMap = (image) => {
  return {
    type: mapConstants.SET_UPLOADING_MAP,
    payload: {
      image,
    },
  };
};

export const clearUploadingMap = () => {
  return {
    type: mapConstants.CLEAR_UPLOADING_MAP,
  };
};


export const setUploadingMapSize = (width, height) => {
  return {
    type: mapConstants.SET_UPLOADING_MAP_SIZE,
    payload: {
      width,
      height,
    },
  };
};

export const setUploadingMapName = (name) => {
  return {
    type: mapConstants.SET_UPLOADING_MAP_NAME,
    payload: {
      name,
    },
  };
};

export const setUploadingMapNameSuccess = (name) => {
  return {
    type: mapConstants.SET_UPLOADING_MAP_NAME_SUCCESS,
    payload: {
      name,
    },
  };
};

export const setUploadingMapRatio = (ratio) => {
  return {
    type: mapConstants.SET_UPLOADING_MAP_RATIO,
    payload: {
      ratio,
    },
  };
};

export const setUploadingMapRatioSuccess = (ratio) => {
  return {
    type: mapConstants.SET_UPLOADING_MAP_RATIO_SUCCESS,
    payload: {
      ratio,
    },
  };
};

export const addNewAnchor = ({ anchorId, x, y }) => {
  return {
    type: mapConstants.ADD_NEW_ANCHOR,
    payload: {
      anchorId,
      x,
      y,
    },
  };
};

export const updateNewAnchor = ({ id, anchorId, x, y }) => {
  return {
    type: mapConstants.UPDATE_NEW_ANCHOR,
    payload: {
      id,
      anchorId,
      x,
      y,
    },
  };
};

export const updateNewAnchorSuccess = ({ id, anchorId, x, y }) => {
  return {
    type: mapConstants.UPDATE_NEW_ANCHOR_SUCCESS,
    payload: {
      id,
      anchorId,
      x,
      y,
    },
  };
};


export const deleteNewAnchor = (id) => {
  return {
    type: mapConstants.DELETE_NEW_ANCHOR,
    payload: {
      id,
    },
  };
};

export const deleteAllNewAnchors = () => {
  return {
    type: mapConstants.CLEAR_NEW_ANCHORS,
  };
};
