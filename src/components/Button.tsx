import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-[#00B388] text-white hover:bg-[#009475] focus:ring-[#00B388]",
        secondary: "bg-[#008E9C] text-white hover:bg-[#007A87] focus:ring-[#008E9C]",
        accent: "bg-[#00A68A] text-white hover:bg-[#008F75] focus:ring-[#00A68A]",
        neutral: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300 border border-gray-300",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3 text-base",
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
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
