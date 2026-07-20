"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import AuthLayout from "./AuthLayout";
import OTPInput from "./OTPInput";
import OTPTimer from "./OTPTimer";
import AuthButton from "./AuthButton";

import {
    verifyForgotOTP,
    forgotPassword
} from "@/lib/api/auth";


export default function VerifyForgotOTPForm(){

    const router = useRouter();


    const email =
        typeof window !== "undefined"
        ? localStorage.getItem("resetEmail")
        : "";


    const [otp,setOtp] = useState("");

    const [loading,setLoading] = useState(false);



    // ==========================
    // VERIFY OTP
    // ==========================

    const handleVerify = async(e)=>{

        e.preventDefault();


        if(otp.length !== 6){

            toast.error(
                "Enter 6 digit OTP"
            );

            return;

        }


        try{

            setLoading(true);


            const data =
            await verifyForgotOTP(
                email,
                otp
            );


            if(!data.success){

                toast.error(
                    data.message
                );

                return;

            }


            toast.success(
                "OTP verified"
            );


            router.push(
                "/reset-password"
            );


        }

        catch(error){

            console.log(error);

            toast.error(
                "OTP verification failed"
            );

        }

        finally{

            setLoading(false);

        }

    };



    // ==========================
    // RESEND OTP
    // ==========================

    const handleResend = async()=>{


        const data =
        await forgotPassword(email);



        if(data.success){

            toast.success(
                "OTP sent again"
            );

        }

        else{

            toast.error(
                data.message
            );

        }

    };



return (

<AuthLayout

title="Verify OTP"

subtitle="Enter the OTP sent to your email"


>


<form

onSubmit={handleVerify}

className="space-y-8"

>


<div

className="rounded-2xl border border-yellow-500/20 bg-white/5 p-4"

>

<p className="text-sm text-gray-400">

OTP sent to

</p>


<p className="mt-1 break-all font-semibold text-yellow-400">

{email}

</p>


</div>



<OTPInput

otp={otp}

setOtp={setOtp}

/>



<AuthButton

loading={loading}

>

Verify OTP

</AuthButton>



</form>



<OTPTimer

onResend={handleResend}

/>


</AuthLayout>

);


}