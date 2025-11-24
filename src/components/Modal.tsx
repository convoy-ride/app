"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const overlayVariants = cva(
  "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 z-50",
  {
    variants: {
      show: {
        true: "opacity-100",
        false: "opacity-0 pointer-events-none",
      },
    },
  }
);

const modalVariants = cva(
  "fixed bg-white transition-all duration-300 z-50",
  {
    variants: {
      show: {
        true: "translate-y-0 md:scale-100 md:opacity-100",
        false: "translate-y-full md:translate-y-0 md:scale-95 md:opacity-0",
      },
      size: {
        sm: "md:max-w-md",
        md: "md:max-w-lg",
        lg: "md:max-w-2xl",
        xl: "md:max-w-4xl",
        full: "md:max-w-full md:m-4",
      },
    },
    defaultVariants: {
      show: false,
      size: "md",
    },
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
  showCloseButton = true,
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Handle render state for animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
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
      {/* Overlay */}
      <div
        className={overlayVariants({ show: isOpen })}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal/Bottom Sheet */}
      <div
        className={`${modalVariants({ show: isOpen, size })} 
          bottom-0 left-0 right-0 rounded-t-3xl
          md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl
          max-h-[90vh] md:max-h-[85vh] overflow-hidden
          w-full shadow-2xl`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            {/* Drag handle for mobile */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full md:hidden" />

            <h2 className="text-lg font-semibold text-gray-900 mt-3 md:mt-0">
              {title}
            </h2>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-1 rounded-md hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto p-6 max-h-[calc(90vh-4rem)] md:max-h-[calc(85vh-4rem)]">
          {children}
        </div>
      </div>
    </>
  );
}
