"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AuthButton from "./AuthButton";

import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

import { loginUser } from "@/lib/api/auth";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {

    const router = useRouter();

    const { checkAuth } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        email: "",

        password: "",

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    const validate = () => {

        const err = {};

        if (!form.email.trim()) {

            err.email = "Email is required";

        }

        if (!form.password.trim()) {

            err.password = "Password is required";

        }

        setErrors(err);

        return Object.keys(err).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            const data = await loginUser(form);


            if (!data.success) {

                toast.error(data.message);

                return;

            }

           await checkAuth();

toast.success("Welcome back!");

if (
    data.user.role === "admin" ||
    data.user.role === "superadmin"
) {
    router.push("/admin");
} else {
    router.push("/");
}

        }

        catch (error) {

            console.log(error);

            toast.error("Login failed");

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <AuthLayout

            title="Welcome Back"

            subtitle="Login to continue your luxury experience."

        >

            <form

                onSubmit={handleSubmit}

                className="space-y-5"

            >

                <AuthInput

                    label="Email Address"

                    type="email"

                    name="email"

                    icon={Mail}

                    placeholder="Enter your email"

                    value={form.email}

                    onChange={handleChange}

                    error={errors.email}

                />

                <PasswordInput

                    label="Password"

                    name="password"

                    value={form.password}

                    onChange={handleChange}

                    error={errors.password}

                />

                <div className="flex justify-end">

                    <Link

                        href="/forgot-password"

                        className="text-sm font-medium text-yellow-400 transition hover:text-yellow-300"

                    >

                        Forgot Password?

                    </Link>

                </div>
<AuthButton loading={loading}>

    Login

</AuthButton>

            </form>

            <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-white/10" />

                <span className="mx-4 text-sm text-gray-400">

                    OR

                </span>

                <div className="h-px flex-1 bg-white/10" />

            </div>

            <button

                type="button"

                className="flex h-14 w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-white transition hover:border-yellow-500 hover:bg-white/10"

            >

                Continue with Google

            </button>

            <p className="mt-8 text-center text-sm text-gray-300">

                Don't have an account?

                <Link

                    href="/register"

                    className="ml-2 font-bold text-yellow-400 transition hover:text-yellow-300"

                >

                    Create Account

                </Link>

            </p>

        </AuthLayout>

    );

}