"use client";

import { motion } from "framer-motion";

export default function AuthInput({
  label,
  icon: Icon,

  rightIcon: RightIcon,
  onRightIconClick,

  error,
  className = "",

  ...props
}) {
  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-200">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className={`
          relative
          rounded-2xl
          border
          transition-all
          duration-300
          ${
            error
              ? "border-red-500"
              : "border-white/20 hover:border-yellow-500/60 focus-within:border-yellow-500"
          }
          bg-white/5
          backdrop-blur-md
        `}
      >
        {/* Left Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon
              size={20}
              className={
                error ? "text-red-400" : "text-yellow-400"
              }
            />
          </div>
        )}

        {/* Input */}
        <input
          {...props}
          className={`
            h-14
            w-full
            rounded-2xl
            bg-transparent
            ${Icon ? "pl-12" : "pl-4"}
            ${RightIcon ? "pr-12" : "pr-4"}
            text-white
            placeholder:text-gray-400
            outline-none
            ${className}
          `}
        />

        {/* Right Icon */}
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300"
          >
            <RightIcon size={20} />
          </button>
        )}
      </motion.div>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
} 