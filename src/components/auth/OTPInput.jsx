"use client";

import { useRef } from "react";

export default function OTPInput({

    otp,

    setOtp,

    length = 6,

}) {

    const inputRefs = useRef([]);

    // ==========================
    // CHANGE
    // ==========================

    const handleChange = (index, value) => {

        if (!/^\d*$/.test(value)) return;

        const otpArray = otp.split("");

        otpArray[index] = value;

        const newOtp = otpArray.join("");

        setOtp(newOtp);

        if (

            value &&

            index < length - 1

        ) {

            inputRefs.current[index + 1]?.focus();

        }

    };

    // ==========================
    // BACKSPACE
    // ==========================

    const handleKeyDown = (

        index,

        e

    ) => {

        if (

            e.key === "Backspace" &&

            !otp[index] &&

            index > 0

        ) {

            inputRefs.current[index - 1]?.focus();

        }

    };

    // ==========================
    // PASTE
    // ==========================

    const handlePaste = (e) => {

        e.preventDefault();

        const pasted =

            e.clipboardData

                .getData("text")

                .replace(/\D/g, "")
                .slice(0, length);

        setOtp(pasted);

        pasted.split("").forEach(

            (_, index) => {

                if (

                    inputRefs.current[index]

                ) {

                    inputRefs.current[index].value =

                        pasted[index];

                }

            }

        );

    };

    return (

        <div

            className="flex justify-center gap-3"

            onPaste={handlePaste}

        >

            {

                [...Array(length)].map(

                    (_, index) => (

                        <input

                            key={index}

                            ref={(el) =>

                                inputRefs.current[index] = el

                            }

                            type="text"

                            maxLength={1}

                            value={otp[index] || ""}

                            onChange={(e) =>

                                handleChange(

                                    index,

                                    e.target.value

                                )

                            }

                            onKeyDown={(e) =>

                                handleKeyDown(

                                    index,

                                    e

                                )

                            }

                            className="h-14 w-14 rounded-2xl border border-white/20 bg-white/5 text-center text-2xl font-bold text-white outline-none transition focus:border-yellow-500 focus:bg-white/10"

                        />

                    )

                )

            }

        </div>

    );

}