"use client";

import { useEffect, useState } from "react";

export default function OTPTimer({

    initialTime = 60,

    onResend,

}) {

    const [timeLeft, setTimeLeft] = useState(initialTime);

    const [loading, setLoading] = useState(false);

    // ==========================
    // COUNTDOWN
    // ==========================

    useEffect(() => {

        if (timeLeft <= 0) return;

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    // ==========================
    // RESEND
    // ==========================

    const handleResend = async () => {

        if (timeLeft > 0 || loading) return;

        try {

            setLoading(true);

            await onResend();

            setTimeLeft(initialTime);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    return (

        <div className="mt-6 flex flex-col items-center gap-3">

            {

                timeLeft > 0

                ?

                <p className="text-sm text-gray-300">

                    Resend OTP in

                    <span className="ml-2 font-bold text-yellow-400">

                        {String(minutes).padStart(2, "0")}:

                        {String(seconds).padStart(2, "0")}

                    </span>

                </p>

                :

                <button

                    onClick={handleResend}

                    disabled={loading}

                    className="rounded-xl bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60"

                >

                    {

                        loading

                        ?

                        "Sending..."

                        :

                        "Resend OTP"

                    }

                </button>

            }

        </div>

    );

}