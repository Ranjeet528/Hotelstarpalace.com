import api from "@/lib/axios";

// ============================
// GET SETTINGS
// ============================
export const getSettings = async () => {
  const res = await api.get("/settings", {
    withCredentials: true,
  });

  return res.data;
};

// ============================
// UPDATE SETTINGS
// ============================
export const updateSettings = async (data) => {
  const res = await api.put("/settings", data, {
    withCredentials: true,
  });

  return res.data;
};