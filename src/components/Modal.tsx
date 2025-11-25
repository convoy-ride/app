"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

const overlayVariants = cva(
  "fixed inset-0 backdrop-blur-md transition-opacity duration-300 z-50",
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
  "fixed bg-white transition-all z-50 shadow-elevation-5",
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
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number>(0);
  const scrollStartY = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle render state for animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setDragOffset(0);
      // Focus the modal when it opens
      setTimeout(() => modalRef.current?.focus(), 50);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setShouldRender(false);
        setDragOffset(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Touch handlers for swipe to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    const contentElement = modalRef.current?.querySelector(
      ".modal-content"
    ) as HTMLElement;
    if (!contentElement) return;

    const scrollTop = contentElement.scrollTop;
    dragStartY.current = e.touches[0].clientY;
    scrollStartY.current = scrollTop;

    // Only allow drag if at the top of scroll
    if (scrollTop === 0) {
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartY.current;

    // Only allow dragging down
    if (diff > 0) {
      setDragOffset(diff);
      // Prevent scroll while dragging
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Close if dragged more than 100px
    if (dragOffset > 100) {
      onClose();
    } else {
      // Spring back
      setDragOffset(0);
    }
  };

  if (!mounted || !shouldRender) {
    return null;
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={overlayVariants({ show: isOpen })}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal/Bottom Sheet */}
      <div
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)"
        }}
        className={`${modalVariants({ show: isOpen, size })} 
          bottom-0 left-0 right-0 rounded-t-3xl border-t border-gray-100
          md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border
          max-h-[92vh] md:max-h-[85vh] overflow-hidden outline-none
          w-full pb-safe`}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-2 md:hidden bg-white sticky top-0 z-10">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 active-scale"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="modal-content overflow-y-auto p-6 max-h-[calc(92vh-12rem)] md:max-h-[calc(85vh-8rem)] bg-white custom-scrollbar smooth-scroll">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}
