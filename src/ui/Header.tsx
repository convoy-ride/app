import Image from "next/image";
import Button from "@/components/Button";
import { Wallet } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-3 z-50 shadow-sm transition-all duration-300">
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
