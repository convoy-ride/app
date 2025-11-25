import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98] relative overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-[#059669] text-white hover:bg-[#047857] focus:ring-[#059669] shadow-sm hover:shadow-md",
        secondary:
          "bg-[#475569] text-white hover:bg-[#334155] focus:ring-[#475569] shadow-sm hover:shadow-md",
        accent:
          "bg-[#f59e0b] text-white hover:bg-[#d97706] focus:ring-[#f59e0b] shadow-sm hover:shadow-md",
        neutral:
          "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 shadow-sm hover:shadow-md focus:ring-gray-200",
        ghost:
          "bg-transparent text-[#059669] hover:bg-[#059669]/10 focus:ring-[#059669]",
        elevated:
          "bg-white text-gray-900 border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:ring-[#059669]"
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
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
  (
    {
      className,
      variant,
      size,
      children,
      loading,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
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
