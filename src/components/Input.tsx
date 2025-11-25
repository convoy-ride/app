"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";

const inputVariants = cva(
  "w-full font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 text-gray-900 overflow-hidden",
  {
    variants: {
      variant: {
        outline:
          "bg-white border border-gray-200 focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/10 hover:border-gray-300 shadow-sm",
        filled:
          "bg-gray-50 border border-transparent focus:bg-white focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/10 hover:bg-gray-100 shadow-sm",
        ghost:
          "bg-transparent border-b border-gray-200 focus:border-[#059669] rounded-none px-0 hover:border-gray-300",
        premium:
          "bg-white border border-gray-200 focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/10 shadow-md hover:shadow-lg transition-shadow"
      },
      size: {
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-4 py-2.5 text-sm rounded-lg",
        lg: "px-5 py-3.5 text-base rounded-lg"
      },
      state: {
        default: "",
        error: "border-red-300 focus:border-red-500 focus:ring-red-500/10",
        success:
          "border-green-300 focus:border-green-500 focus:ring-green-500/10"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      state: "default"
    }
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      label,
      error,
      success,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const currentState = error ? "error" : success ? "success" : state;

    return (
      <div
        className={`w-full ${props.type === "datetime-local" ? "min-w-0" : ""}`}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputVariants({
            variant,
            size,
            state: currentState,
            className
          })}
          style={{
            maxWidth: "100%",
            ...(props.type === "datetime-local" && {
              minWidth: 0,
              width: "100%"
            })
          }}
          {...props}
        />
        {(error || success || helperText) && (
          <p
            className={`mt-2 text-sm ${
              error
                ? "text-red-600"
                : success
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
