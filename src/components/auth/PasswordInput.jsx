"use client";

import { useMemo, useState } from "react";
import { Lock, Eye, EyeOff, Check, X } from "lucide-react";
import { motion } from "framer-motion";

export default function PasswordInput({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter your password",
  error,
}) {

  const [show, setShow] = useState(false);

  const rules = useMemo(() => {

    return {

      length: value.length >= 8,

      uppercase: /[A-Z]/.test(value),

      number: /\d/.test(value),

      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),

    };

  }, [value]);

  const score = Object.values(rules).filter(Boolean).length;

  const strength =

    score === 0
      ? ""
      : score === 1
      ? "Weak"
      : score === 2
      ? "Fair"
      : score === 3
      ? "Good"
      : "Strong";

  const strengthColor =

    score <= 1
      ? "bg-red-500"
      : score === 2
      ? "bg-yellow-500"
      : score === 3
      ? "bg-blue-500"
      : "bg-green-500";

  return (

    <div className="space-y-2">

      <label className="block text-sm font-semibold text-gray-200">

        {label}

      </label>

      <div
        className={`

        relative

        rounded-2xl

        border

        ${
          error
            ? "border-red-500"
            : "border-white/20 focus-within:border-yellow-500"
        }

        bg-white/5

        backdrop-blur-md

        transition

        `}

      >

        <Lock
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
        />

        <input

          type={show ? "text" : "password"}

          name={name}

          value={value}

          onChange={onChange}

          placeholder={placeholder}

          className="h-14 w-full rounded-2xl bg-transparent pl-12 pr-14 text-white outline-none placeholder:text-gray-400"

        />

        <button

          type="button"

          onClick={() => setShow(!show)}

          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"

        >

          {show ? <EyeOff size={20} /> : <Eye size={20} />}

        </button>

      </div>

      {error && (

        <p className="text-sm text-red-400">

          {error}

        </p>

      )}

      {value && (

        <>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

            <motion.div

              initial={{ width: 0 }}

              animate={{

                width: `${score * 25}%`,

              }}

              className={`h-full ${strengthColor}`}

            />

          </div>

          <p className="text-sm font-medium text-yellow-400">

            {strength}

          </p>

          <div className="mt-3 grid gap-2">

            <Rule
              ok={rules.length}
              text="Minimum 8 characters"
            />

            <Rule
              ok={rules.uppercase}
              text="One uppercase letter"
            />

            <Rule
              ok={rules.number}
              text="One number"
            />

            <Rule
              ok={rules.special}
              text="One special character"
            />

          </div>

        </>

      )}

    </div>

  );

}

function Rule({ ok, text }) {

  return (

    <div className="flex items-center gap-2 text-sm">

      {ok ? (

        <Check
          size={16}
          className="text-green-400"
        />

      ) : (

        <X
          size={16}
          className="text-red-400"
        />

      )}

      <span
        className={

          ok

            ? "text-green-300"

            : "text-gray-400"

        }

      >

        {text}

      </span>

    </div>

  );

}