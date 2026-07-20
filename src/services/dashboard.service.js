import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_API_URL}/dashboard`;

// =============================
// DASHBOARD STATS
// =============================
export const getDashboardStats = async () => {
  const { data } = await axios.get(`${API}`, {
    withCredentials: true,
  });

  return data;
};

// =============================
// ROOM DISTRIBUTION
// =============================
export const getRoomDistribution = async () => {
  const { data } = await axios.get(
    `${API}/room-distribution`,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// MONTHLY REVENUE
// =============================
export const getMonthlyRevenue = async () => {
  const { data } = await axios.get(
    `${API}/monthly-revenue`,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// BOOKING SOURCES
// =============================
export const getBookingSources = async () => {
  const { data } = await axios.get(
    `${API}/booking-sources`,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// PAYMENT SUMMARY
// =============================
export const getPaymentStatusSummary = async () => {
  const { data } = await axios.get(
    `${API}/payment-summary`,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// OCCUPANCY REPORT
// =============================
export const getOccupancyReport = async () => {
  const { data } = await axios.get(
    `${API}/occupancy-report`,
    {
      withCredentials: true,
    }
  );

  return data;
};


// =============================
// RECENT PAYMENTS
// =============================
export const getRecentPayments = async () => {
  const { data } = await axios.get(
    `${API}/recent-payments`,
    {
      withCredentials: true,
    }
  );

  return data;
};

// =============================
// TOP CUSTOMERS
// =============================
export const getTopCustomers = async () => {
  const { data } = await axios.get(
    `${API}/top-customers`,
    {
      withCredentials: true,
    }
  );

  return data;
};


// =============================
// TODAY ACTIVITIES
// =============================
export const getTodayActivities = async () => {
  const { data } = await axios.get(
    `${API}/today-activities`,
    {
      withCredentials: true,
    }
  );

  

  return data;
};