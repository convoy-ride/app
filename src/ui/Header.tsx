"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { Wallet } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Check if we're on rider or driver pages
  const isRiderOrDriverPage =
    pathname?.startsWith("/rider") || pathname?.startsWith("/driver");

  // On rider/driver pages, only show the wallet button
  if (isRiderOrDriverPage) {
    return (
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full !p-3 glassmorphism shadow-elevation-3 hover:shadow-elevation-4 hover:scale-105 transition-all duration-300 text-gray-700 border border-gray-200"
          aria-label="Connect Wallet"
        >
          <Wallet className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  // Regular header for other pages
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-md px-6 py-3 z-50 transition-all duration-300 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <Image
            src="/convoy-logo.svg"
            alt="Convoy Logo"
            width={175}
            height={56}
            priority
            className="h-14 w-auto"
          />
        </div>

        {/* Desktop Spacer (to keep right items aligned) */}
        <div className="hidden md:block" />

        {/* Right side - Wallet Icon Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full !p-2 hover:bg-gray-100 text-gray-600"
            aria-label="Connect Wallet"
          >
            <Wallet className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
