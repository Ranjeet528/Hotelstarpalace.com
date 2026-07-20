import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_API_URL}/contact`;

// =========================
// SEND CONTACT MESSAGE
// =========================
export const sendContactMessage = async (contactData) => {
  const { data } = await axios.post(
    API,
    contactData,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =========================
// GET ALL CONTACTS
// =========================
export const getAllContacts = async () => {
  const { data } = await axios.get(API, {
    withCredentials: true,
  });

  return data;
};

// =========================
// GET SINGLE CONTACT
// =========================
export const getContact = async (id) => {
  const { data } = await axios.get(
    `${API}/${id}`,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =========================
// MARK AS READ
// =========================
export const markAsRead = async (id) => {
  const { data } = await axios.patch(
    `${API}/${id}/read`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

// =========================
// DELETE CONTACT
// =========================
export const deleteContact = async (id) => {
  const { data } = await axios.delete(
    `${API}/${id}`,
    {
      withCredentials: true,
    }
  );

  return data;
};