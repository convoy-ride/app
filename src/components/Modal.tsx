"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const overlayVariants = cva(
  "fixed inset-0 backdrop-blur-md transition-all duration-300 z-50",
  {
    variants: {
      show: {
        true: "opacity-100 bg-black/50",
        false: "opacity-0 pointer-events-none bg-black/0"
      }
    }
  }
);

const modalVariants = cva(
  "fixed bg-white transition-all duration-500 z-50 shadow-elevation-5",
  {
    variants: {
      show: {
        true: "translate-y-0 md:scale-100 md:opacity-100",
        false: "translate-y-full md:translate-y-0 md:scale-95 md:opacity-0"
      },
      size: {
        sm: "md:max-w-md",
        md: "md:max-w-lg",
        lg: "md:max-w-2xl",
        xl: "md:max-w-4xl",
        full: "md:max-w-full md:m-4"
      }
    },
    defaultVariants: {
      show: false,
      size: "md"
    }
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size,
  showCloseButton = true
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Handle render state for animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      document.body.style.overflow = "";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={overlayVariants({ show: isOpen })}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal/Bottom Sheet */}
      <div
        className={`${modalVariants({ show: isOpen, size })} 
          bottom-0 left-0 right-0 rounded-t-[2rem] border-t border-gray-100
          md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border
          max-h-[92vh] md:max-h-[85vh] overflow-hidden
          w-full pb-safe transition-transform duration-300 cubic-bezier(0.32, 0.72, 0, 1)`}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Drag Handle Area */}
        <div
          className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white"
          onClick={onClose}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto p-6 max-h-[calc(90vh-8rem)] md:max-h-[calc(85vh-5rem)] bg-white custom-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
}
