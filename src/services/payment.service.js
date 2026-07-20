import api from "@/lib/axios";

// =============================
// CREATE RAZORPAY ORDER
// =============================
export const createOrder = async (data) => {
  const res = await api.post("/payments/create-order", data);
  return res.data;
};

// =============================
// VERIFY PAYMENT
// =============================
export const verifyPayment = async (data) => {
  const res = await api.post("/payments/verify", data);
  return res.data;
};