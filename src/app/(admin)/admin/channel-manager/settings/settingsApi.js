import axios from "@/lib/axios";

// ============================
// GET CHANNEL SETTINGS
// ============================
export const getSettings = () =>
  axios.get("/channel-settings");

// ============================
// UPDATE CHANNEL SETTINGS
// ============================
export const updateSettings = (data) =>
  axios.put("/channel-settings", data);