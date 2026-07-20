import api from "@/lib/axios";

// ==============================
// GET ALL USERS
// ==============================
export const getAllUsers = async () => {
  const res = await api.get("/auth/admin/users");
  return res.data;
};

// ==============================
// GET SINGLE USER
// ==============================
export const getUserById = async (id) => {
  const res = await api.get(`/auth/admin/users/${id}`);
  return res.data;
};

// ==============================
// BLOCK / UNBLOCK USER
// ==============================
export const toggleUserBlock = async (id) => {
  const res = await api.patch(`/auth/admin/users/${id}/block`);
  return res.data;
};

// ==============================
// UPDATE USER ROLE
// ==============================
export const updateUserRole = async (id, role) => {
  const res = await api.patch(`/auth/admin/users/${id}/role`, {
    role,
  });

  return res.data;
};