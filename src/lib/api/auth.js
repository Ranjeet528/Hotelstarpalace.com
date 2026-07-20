const API = process.env.NEXT_PUBLIC_API_URL;


// ==========================
// REGISTER
// ==========================

export const registerUser = async (userData) => {

    const res = await fetch(`${API}/auth/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(userData),

    });


    return await res.json();

};



// ==========================
// LOGIN
// ==========================

export const loginUser = async (userData) => {

    const res = await fetch(`${API}/auth/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(userData),

    });


    return await res.json();

};



// ==========================
// GET ME
// ==========================

export const getMe = async () => {

    const res = await fetch(`${API}/auth/me`, {

        method: "GET",

        credentials: "include",

    });


    return await res.json();

};



// ==========================
// LOGOUT
// ==========================

export const logoutUser = async () => {

    const res = await fetch(`${API}/auth/logout`, {

        method: "POST",

        credentials: "include",

    });


    return await res.json();

};



// ==========================
// VERIFY REGISTER OTP
// ==========================

export const verifyOTP = async (email, otp) => {

    const res = await fetch(`${API}/auth/verify-otp`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({

            email,

            otp,

        }),

    });


    return await res.json();

};



// ==========================
// RESEND REGISTER OTP
// ==========================

export const resendOTP = async (email) => {

    const res = await fetch(`${API}/auth/resend-otp`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({

            email,

        }),

    });


    return await res.json();

};



// ==========================
// FORGOT PASSWORD
// ==========================

export const forgotPassword = async (email) => {

    const res = await fetch(`${API}/auth/forgot-password`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({

            email,

        }),

    });


    return await res.json();

};



// ==========================
// VERIFY FORGOT OTP
// ==========================

export const verifyForgotOTP = async (email, otp) => {

    const res = await fetch(`${API}/auth/verify-forgot-otp`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({

            email,

            otp,

        }),

    });


    return await res.json();

};



// ==========================
// RESET PASSWORD
// ==========================

export const resetPassword = async (data) => {

    const res = await fetch(`${API}/auth/reset-password`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(data),

    });


    return await res.json();

};