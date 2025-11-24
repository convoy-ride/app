import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";

const inputVariants = cva(
  "w-full transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-text",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-300 text-gray-900 focus:border-[#00B388] focus:ring-2 focus:ring-[#00B388]/20",
        filled: "bg-gray-100 border border-gray-100 text-gray-900 focus:bg-white focus:border-[#00B388] focus:ring-2 focus:ring-[#00B388]/20",
        minimal: "bg-transparent border-b border-gray-300 text-gray-900 focus:border-[#00B388] rounded-none px-0",
      },
      size: {
        sm: "px-3 py-2 text-sm rounded-md",
        md: "px-4 py-2.5 text-sm rounded-md",
        lg: "px-4 py-3 text-base rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
  VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, label, error, helperText, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={inputVariants({ variant, size, className })}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
