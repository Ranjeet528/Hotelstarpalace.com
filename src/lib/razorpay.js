// =============================
// LOAD RAZORPAY CHECKOUT SCRIPT
// =============================
// Loads https://checkout.razorpay.com/v1/checkout.js on demand
// (only when the guest is about to pay), instead of on every page
// load. Safe to call multiple times — resolves immediately if the
// script (and window.Razorpay) is already available.
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      return resolve(false);
    }

    if (window.Razorpay) {
      return resolve(true);
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};