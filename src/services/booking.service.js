import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// =============================
// CREATE BOOKING
// =============================
export const createBooking = async (bookingData) => {
  const { data } = await axios.post(
    `${API}/bookings`,
    bookingData,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// CHECK AVAILABILITY
// =============================
export const checkAvailability = async (payload) => {
  const { data } = await axios.post(
    `${API}/bookings/check`,
    payload,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// GET ALL BOOKINGS
// =============================
export const fetchBookings = async (
  status = "all",
  page = 1,
  limit = 10
) => {
  const { data } = await axios.get(`${API}/bookings`, {
    params: {
      status,
      page,
      limit,
    },
    withCredentials: true,
  });

  return data;
};

// =============================
// GET SINGLE BOOKING
// =============================
export const getBooking = async (id) => {
  const { data } = await axios.get(
    `${API}/bookings/${id}`,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// USER CANCEL BOOKING
// =============================
export const cancelUserBooking = async (id) => {
  const { data } = await axios.put(
    `${API}/bookings/cancel/${id}`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// ADMIN CANCEL BOOKING
// =============================
export const cancelAdminBooking = async (
  id,
  reason = ""
) => {
  const { data } = await axios.put(
    `${API}/bookings/admin-cancel/${id}`,
    {
      reason,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// COMPLETE BOOKING
// =============================
export const completeBooking = async (id) => {
  const { data } = await axios.patch(
    `${API}/bookings/${id}/complete`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// CHECK-IN
// =============================
export const checkInBooking = async (id) => {
  const { data } = await axios.patch(
    `${API}/bookings/${id}/checkin`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// CHECK-OUT
// =============================
export const checkOutBooking = async (id) => {
  const { data } = await axios.patch(
    `${API}/bookings/${id}/checkout`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};