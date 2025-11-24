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
    } else {
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
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
      {/* Glassmorphism Overlay */}
      <div
        className={overlayVariants({ show: isOpen })}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal/Bottom Sheet */}
      <div
        className={`${modalVariants({ show: isOpen, size })} 
          bottom-0 left-0 right-0 rounded-t-3xl border-t border-gray-100
          md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:border
          max-h-[90vh] md:max-h-[85vh] overflow-hidden
          w-full`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            {/* Premium drag handle for mobile */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-gradient-to-r from-gray-200 via-[#00B388] to-gray-200 rounded-full md:hidden shadow-sm" />

            <h2 className="text-xl font-bold text-gray-900 mt-4 md:mt-0 gradient-text-vibrant animate-gradient">
              {title}
            </h2>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-900 transition-smooth duration-200 p-2 rounded-xl hover:bg-gray-50 active-scale shadow-sm hover:shadow-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content with custom scrollbar */}
        <div className="overflow-y-auto p-6 max-h-[calc(90vh-5rem)] md:max-h-[calc(85vh-5rem)] animate-fade-in bg-white custom-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
}
