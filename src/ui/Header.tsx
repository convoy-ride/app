import Image from "next/image";
import Button from "@/components/Button";
import { Wallet } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full glassmorphism-strong border-b border-gray-100/50 px-6 py-3 z-50 shadow-elevation-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="hover-lift rounded-xl">
          <Image
            src="/convoy-logo.svg"
            alt="Convoy Logo"
            width={70}
            height={70}
            priority
            className="transition-transform duration-300"
          />
        </div>

        {/* Right side - Wallet Icon Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="elevated"
            size="md"
            className="!rounded-full !p-3 group relative"
            aria-label="Connect Wallet"
          >
            <Wallet className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            {/* Tooltip on hover */}
            <span className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
              Connect Wallet
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
