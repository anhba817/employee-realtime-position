import { API_URL } from "../constants/common";
import axiosService from "./axiosService";
import csrfHeader from "./csrf-header";

export const uploadMap = (image, name, ratio, width, height) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("ratio", ratio);
  formData.append("image", image);
  formData.append("width", width);
  formData.append("height", height);
  return axiosService.post(`${API_URL}/maps`, formData, {
    headers: csrfHeader()
    // , 'Content-Type': 'multipart/form-data'},
  });
};

export const getAllMaps = () => {
  return axiosService.get(`${API_URL}/maps`, { headers: csrfHeader() });
};

export const updateMap = (payload) => {
  return axiosService.put(`${API_URL}/maps`, { headers: csrfHeader() });
};

export const deleteMap = (id) => {
  return axiosService.delete(`${API_URL}/maps/${id}`);
};
