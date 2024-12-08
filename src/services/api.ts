import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coincap.io/v2",
});

export const getTopAssets = async () => {
  const response = await api.get("/assets?limit=50");
  return response.data.data;
};

export const getAssetHistory = async (id: string) => {
  const response = await api.get(`/assets/${id}/history?interval=h1`);
  return response.data.data;
};

export const getAssetDetails = async (id: string) => {
  const response = await api.get(`/assets/${id}`);
  return response.data.data;
};