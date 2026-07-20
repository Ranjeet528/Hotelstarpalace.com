"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AuthButton({

  children,

  loading = false,

  type = "submit",

  className = "",

  disabled = false,

  onClick,

}) {

  return (

    <motion.button

      type={type}

      onClick={onClick}

      disabled={loading || disabled}

      whileHover={

        loading || disabled

          ? {}

          : { scale: 1.02 }

      }

      whileTap={

        loading || disabled

          ? {}

          : { scale: 0.98 }

      }

      className={`

        group

        relative

        flex

        h-14

        w-full

        items-center

        justify-center

        overflow-hidden

        rounded-2xl

        bg-gradient-to-r

        from-yellow-500

        via-amber-500

        to-yellow-600

        px-6

        font-bold

        text-black

        shadow-lg

        transition-all

        duration-300

        hover:shadow-yellow-500/30

        disabled:cursor-not-allowed

        disabled:opacity-60

        ${className}

      `}

    >

      {/* Glow */}

      <span

        className="

          absolute

          inset-0

          bg-white/10

          opacity-0

          transition-opacity

          duration-300

          group-hover:opacity-100

        "

      />

      {

        loading

        ?

        <div className="flex items-center gap-2">

          <Loader2

            size={20}

            className="animate-spin"

          />

          <span>

            Please wait...

          </span>

        </div>

        :

        <span className="relative z-10">

          {children}

        </span>

      }

    </motion.button>

  );

}