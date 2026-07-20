import axios from "@/lib/axios";

export const getInventory = (params) =>
  axios.get("/inventory", { params });

export const updateInventory = (id, data) =>
  axios.put(`/inventory/${id}`, data);

export const bulkUpdateInventory = (data) =>
  axios.post("/inventory/bulk-update", data);

export const syncInventory = () =>
  axios.post("/inventory/sync");