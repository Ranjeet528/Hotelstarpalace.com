import axios from "@/lib/axios";

export const getChannels = () =>
  axios.get("/channels");

export const createChannel = (data) =>
  axios.post("/channels", data);

export const updateChannel = (id, data) =>
  axios.put(`/channels/${id}`, data);

export const deleteChannel = (id) =>
  axios.delete(`/channels/${id}`);

export const syncChannel = (id) =>
  axios.post(`/channels/${id}/sync`);