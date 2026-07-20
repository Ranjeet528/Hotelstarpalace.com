import axios from "@/lib/axios";

export const getRoomMappings = () =>
  axios.get("/room-mappings");

export const createRoomMapping = (data) =>
  axios.post("/room-mappings", data);

export const updateRoomMapping = (id, data) =>
  axios.put(`/room-mappings/${id}`, data);

export const deleteRoomMapping = (id) =>
  axios.delete(`/room-mappings/${id}`);

export const syncRoomMapping = (id) =>
  axios.post(`/room-mappings/${id}/sync`);