"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AuthLayout({

    title,

    subtitle,

    children,

}) {

    return (

        <div className="min-h-screen grid lg:grid-cols-2 bg-black">

            {/* LEFT */}

            <div className="relative hidden lg:block">

                <Image

                    src="/hotel-hero.png"

                    alt="Star Palace"

                    fill

                    priority

                    className="object-cover"

                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute inset-0 flex flex-col justify-end p-16 text-white">

                    <h1 className="text-6xl font-black">

                        STAR PALACE

                    </h1>

                    <p className="mt-6 text-2xl leading-relaxed text-gray-200">

                        Experience Luxury

                        Beyond Imagination

                    </p>

                </div>

            </div>

            {/* RIGHT */}

            <div className="flex items-center justify-center bg-gradient-to-br from-stone-950 via-black to-stone-900 px-6 py-12">

                <motion.div

                    initial={{

                        opacity:0,

                        y:40,

                    }}

                    animate={{

                        opacity:1,

                        y:0,

                    }}

                    transition={{

                        duration:.6,

                    }}

                    className="w-full max-w-md rounded-3xl border border-yellow-500/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl"

                >

                    <div className="mb-8">

                        <h2 className="text-4xl font-black text-white">

                            {title}

                        </h2>

                        <p className="mt-3 text-gray-300">

                            {subtitle}

                        </p>

                    </div>

                    {children}

                </motion.div>

            </div>

        </div>

    );

}