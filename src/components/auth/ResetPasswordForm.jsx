"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Lock } from "lucide-react";

import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

import {
    resetPassword
} from "@/lib/api/auth";


export default function ResetPasswordForm(){

    const router = useRouter();


    const email =
        typeof window !== "undefined"
        ? localStorage.getItem("resetEmail")
        : "";


    const [password,setPassword] = useState("");

    const [confirmPassword,setConfirmPassword] = useState("");

    const [loading,setLoading] = useState(false);


    const [showPassword,setShowPassword] = useState(false);

    const [showConfirm,setShowConfirm] = useState(false);



    const handleSubmit = async(e)=>{

        e.preventDefault();



        if(!password || !confirmPassword){

            toast.error(
                "All fields are required"
            );

            return;

        }



        if(password.length < 8){

            toast.error(
                "Password must be 8 characters"
            );

            return;

        }



        if(password !== confirmPassword){

            toast.error(
                "Passwords do not match"
            );

            return;

        }



        try{

            setLoading(true);


            const data = await resetPassword({

                email,

                password,

                confirmPassword

            });



            if(!data.success){

                toast.error(
                    data.message
                );

                return;

            }



            localStorage.removeItem(
                "resetEmail"
            );



            toast.success(
                "Password reset successfully"
            );


            router.push(
                "/login"
            );


        }

        catch(error){

            console.log(error);

            toast.error(
                "Something went wrong"
            );

        }

        finally{

            setLoading(false);

        }

    };




return (

<AuthLayout

title="Create New Password"

subtitle="Set a new secure password for your account"


>


<form

onSubmit={handleSubmit}

className="space-y-6"

>



<AuthInput

label="New Password"

type={
    showPassword
    ?
    "text"
    :
    "password"
}

icon={Lock}

placeholder="Enter new password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

rightIcon={

showPassword

?

<EyeOff size={20}/>

:

<Eye size={20}/>

}

onRightIconClick={()=>setShowPassword(!showPassword)}

/>




<AuthInput

label="Confirm Password"

type={
    showConfirm
    ?
    "text"
    :
    "password"
}

icon={Lock}

placeholder="Confirm password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

rightIcon={

showConfirm

?

<EyeOff size={20}/>

:

<Eye size={20}/>

}

onRightIconClick={()=>setShowConfirm(!showConfirm)}

/>



<AuthButton

loading={loading}

>

Reset Password

</AuthButton>



</form>



</AuthLayout>

);


}