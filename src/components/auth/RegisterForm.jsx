"use client";

import { useState } from "react";

import Link from "next/link";
import { User, Mail, Phone } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AuthButton from "./AuthButton";

import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

import { registerUser } from "@/lib/api/auth";

export default function RegisterForm() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        name: "",

        email: "",

        phone: "",

        password: "",

    });

    const [errors, setErrors] = useState({});

    // ==========================
    // HANDLE CHANGE
    // ==========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    // ==========================
    // VALIDATION
    // ==========================

    const validate = () => {

        const err = {};

        if (!form.name.trim()) {

            err.name = "Full name is required";

        }

        if (!form.email.trim()) {

            err.email = "Email is required";

        }
        else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {

            err.email = "Invalid email address";

        }

        if (!form.phone.trim()) {

            err.phone = "Phone number is required";

        }
        else if (
            !/^[6-9]\d{9}$/.test(form.phone)
        ) {

            err.phone = "Invalid phone number";

        }

        if (!form.password) {

            err.password = "Password is required";

        }

        setErrors(err);

        return Object.keys(err).length === 0;

    };

    // ==========================
    // REGISTER
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            const data = await registerUser(form);

            if (!data.success) {

                toast.error(data.message);

                return;

            }

            toast.success("OTP sent successfully");

           localStorage.setItem(
    "verifyEmail",
    form.email
);

router.push("/verify-otp");

        }

        catch (error) {

            console.log(error);

            toast.error("Something went wrong");

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <AuthLayout

            title="Create Account"

            subtitle="Create your Star Palace account and enjoy luxury stays."

        >

            <form

                onSubmit={handleSubmit}

                className="space-y-5"

            >

                <AuthInput

                    label="Full Name"

                    name="name"

                    icon={User}

                    placeholder="Ranjeet Gurjar"

                    value={form.name}

                    onChange={handleChange}

                    error={errors.name}

                />

                <AuthInput

                    label="Email Address"

                    name="email"

                    type="email"

                    icon={Mail}

                    placeholder="you@example.com"

                    value={form.email}

                    onChange={handleChange}

                    error={errors.email}

                />

                <AuthInput

                    label="Phone Number"

                    name="phone"

                    icon={Phone}

                    placeholder="9876543210"

                    value={form.phone}

                    onChange={handleChange}

                    error={errors.phone}

                />

                <PasswordInput

                    value={form.password}

                    onChange={handleChange}

                    error={errors.password}

                />

               <AuthButton loading={loading}>

    Create Account

</AuthButton>

            </form>

            <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-white/10"/>

                <span className="mx-4 text-sm text-gray-400">

                    OR

                </span>

                <div className="h-px flex-1 bg-white/10"/>

            </div>

            <button

                type="button"

                className="flex h-14 w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-white transition hover:border-yellow-500 hover:bg-white/10"

            >

                Continue with Google

            </button>

            <p className="mt-8 text-center text-sm text-gray-300">

                Already have an account?

                <Link

                    href="/login"

                    className="ml-2 font-bold text-yellow-400 transition hover:text-yellow-300"

                >

                    Login

                </Link>

            </p>

        </AuthLayout>

    );

}