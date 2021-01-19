import { API_URL } from "../constants/common";
import axiosService from "./axiosService";
import csrfHeader from "./csrf-header";

export const addAnchor = ({ mapId, deviceId, x, y }) => {
  return axiosService.post(
    `${API_URL}/maps/${mapId}/anchors`,
    { deviceId, x, y },
    { headers: csrfHeader() }
  );
};

export const getAnchor = (mapId, id) => {
  return axiosService.get(`${API_URL}/maps/${mapId}/anchors/${id}`, {
    headers: csrfHeader(),
  });
};

export const updateAnchor = ({ mapId, id, deviceId, x, y }) => {
  return axiosService.put(
    `${API_URL}/maps/${mapId}/anchors/${id}`,
    { deviceId, x, y },
    { headers: csrfHeader() }
  );
};

export const deleteAnchor = (mapId, id) => {
  return axiosService.delete(`${API_URL}/maps/${mapId}/anchors/${id}`, {
    headers: csrfHeader(),
  });
};
