"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import AuthLayout from "@/components/auth/AuthLayout";
import OTPInput from "@/components/auth/OTPInput";
import OTPTimer from "@/components/auth/OTPTimer";
import AuthButton from "@/components/auth/AuthButton";

import {
  verifyOTP,
  resendOTP,
} from "@/lib/api/auth";

import { useAuth } from "@/context/AuthContext";

export default function VerifyOTPPage() {


  const router = useRouter();

  const { checkAuth } = useAuth();

 const email =
    typeof window !== "undefined"
        ? localStorage.getItem("verifyEmail")
        : "";

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================
  // VERIFY
  // ==========================

  const handleVerify = async (e) => {

    e.preventDefault();

    if (otp.length !== 6) {

      return toast.error("Please enter 6 digit OTP");

    }

    try {

      setLoading(true);

      const data = await verifyOTP(
        email,
        otp
      );

      if (!data.success) {

        return toast.error(data.message);

      }

      await checkAuth();
      localStorage.removeItem("verifyEmail");

      toast.success("Email verified successfully");

      router.push("/");

    }

    catch (error) {

      console.log(error);

      toast.error("Verification failed");

    }

    finally {

      setLoading(false);

    }

  };

  // ==========================
  // RESEND
  // ==========================

  const handleResend = async () => {

    const data = await resendOTP(email);

    if (data.success) {

      toast.success("OTP sent successfully");

    }

    else {

      toast.error(data.message);

    }

  };
      return (

        <AuthLayout

            title="Verify Email"

            subtitle="Enter the 6-digit verification code sent to your email."

        >

            <form

                onSubmit={handleVerify}

                className="space-y-8"

            >

                {/* Email */}

                <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-4">

                    <p className="text-sm text-gray-400">

                        Verification code sent to

                    </p>

                    <p className="mt-1 break-all font-semibold text-yellow-400">

                        {email}

                    </p>

                </div>

                {/* OTP */}

                <OTPInput

                    otp={otp}

                    setOtp={setOtp}

                />

                {/* Verify */}

                <AuthButton

                    loading={loading}

                >

                    Verify OTP

                </AuthButton>

            </form>

            {/* Timer */}

            <OTPTimer

                onResend={handleResend}

            />

            {/* Change Email */}

            <div className="mt-8 text-center">

                <p className="text-sm text-gray-300">

                    Wrong email?

                </p>

                <button

                    type="button"

                    onClick={() => router.push("/register")}

                    className="mt-2 font-semibold text-yellow-400 transition hover:text-yellow-300"

                >

                    Change Email

                </button>

            </div>

        </AuthLayout>

    );

}