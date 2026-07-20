"use client";

import {useState} from "react";
import {Mail} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";

import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

import {
    forgotPassword
} from "@/lib/api/auth";


export default function ForgotPasswordForm(){


const router = useRouter();


const [email,setEmail]=useState("");

const [loading,setLoading]=useState(false);



const handleSubmit = async(e)=>{

e.preventDefault();


if(!email){

toast.error("Email required");

return;

}


try{


setLoading(true);


const data =
await forgotPassword(email);



if(!data.success){

toast.error(data.message);

return;

}



localStorage.setItem(
"resetEmail",
email
);



toast.success(
"OTP sent successfully"
);



router.push(
"/verify-forgot-otp"
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

title="Forgot Password"

subtitle="Enter your email to reset your password"


>


<form

onSubmit={handleSubmit}

className="space-y-6"

>


<AuthInput

label="Email Address"

type="email"

name="email"

icon={Mail}

placeholder="Enter registered email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<AuthButton loading={loading}>

Send OTP

</AuthButton>



</form>


</AuthLayout>

)


}