import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active-scale relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "gradient-primary text-white hover:shadow-glow focus:ring-[#00B388] animate-gradient before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        secondary: "gradient-secondary text-white hover:shadow-glow focus:ring-[#008E9C] animate-gradient",
        accent: "bg-gradient-to-r from-[#00A68A] to-[#00D9A0] text-white hover:shadow-glow hover:from-[#008F75] hover:to-[#00B388] focus:ring-[#00A68A]",
        neutral: "bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-300 border border-gray-200 shadow-elevation-1 hover:shadow-elevation-3",
        ghost: "bg-transparent text-[#00B388] hover:bg-[#00B388]/10 focus:ring-[#00B388]",
        elevated: "bg-white text-gray-900 border border-gray-100 shadow-elevation-3 hover:shadow-elevation-5 hover:-translate-y-1 focus:ring-[#00B388] transition-all duration-300",
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-2.5 text-sm rounded-xl",
        lg: "px-8 py-3.5 text-base rounded-2xl",
        xl: "px-10 py-4 text-lg rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, loading, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
