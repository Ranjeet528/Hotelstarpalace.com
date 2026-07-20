import axios from "@/lib/axios";

export const getRatePlans = (params) =>
  axios.get("/rate-plans", {
    params,
  });

export const createRatePlan = (data) =>
  axios.post("/rate-plans", data);

export const updateRatePlan = (
  id,
  data
) =>
  axios.put(
    `/rate-plans/${id}`,
    data
  );

export const deleteRatePlan = (id) =>
  axios.delete(`/rate-plans/${id}`);

export const syncRatePlans = () =>
  axios.post("/rate-plans/sync");