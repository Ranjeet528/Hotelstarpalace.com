import api from "@/lib/axios";

/* =========================
   GET ALL ROOMS
========================= */
export const getRooms = async () => {
  const { data } = await api.get("/rooms");
  return data;
};

/* =========================
   GET SINGLE ROOM
========================= */
export const getRoom = async (id) => {
  const { data } = await api.get(`/rooms/${id}`);
  return data;
};

/* =========================
   CREATE ROOM
========================= */
export const createRoom = async (formData) => {
  const { data } = await api.post("/rooms", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return data;
};

/* =========================
   UPDATE ROOM
========================= */
export const updateRoom = async (id, formData) => {
  const { data } = await api.put(`/rooms/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return data;
};

/* =========================
   DELETE ROOM
========================= */
export const deleteRoom = async (id) => {
  const { data } = await api.delete(`/rooms/${id}`, {
    withCredentials: true,
  });

  return data;
};

/* =========================
   STATUS TOGGLE
========================= */
export const updateRoomStatus = async (id) => {
  const { data } = await api.patch(
    `/rooms/${id}/status`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

/* =========================
   BLOCK ROOM
========================= */
export const blockRoom = async (id, payload) => {
  const { data } = await api.post(
    `/rooms/${id}/block`,
    payload,
    {
      withCredentials: true,
    }
  );

  return data;
};

/* =========================
   UNBLOCK ROOM
========================= */
export const unblockRoom = async (id) => {
  const { data } = await api.post(
    `/rooms/${id}/unblock`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

/* =========================
   FEATURED STATUS
========================= */
export const updateFeaturedStatus = async (id) => {
  const { data } = await api.patch(
    `/rooms/${id}/featured`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

/* =========================
   FEATURED ROOMS
========================= */
export const getFeaturedRooms = async () => {
  const { data } = await api.get("/rooms/featured");
  return data;
};