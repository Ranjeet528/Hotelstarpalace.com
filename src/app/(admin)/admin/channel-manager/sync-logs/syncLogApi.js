import axios from "@/lib/axios";

export const getSyncLogs = () =>
  axios.get("/sync-logs");

export const retrySync = (id) =>
  axios.post(`/sync-logs/${id}/retry`);