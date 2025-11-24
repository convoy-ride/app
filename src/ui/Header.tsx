import Image from "next/image";
import Button from "@/components/Button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 px-6 py-2 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo */}
        <div>
          <Image
            src="/convoy-logo.svg"
            alt="Convoy Logo"
            width={70}
            height={70}
            priority
          />
        </div>

        {/* Right side - Connect Button */}
        <div>
          <Button variant="neutral" size="md">
            Connect
          </Button>
        </div>
      </div>
    </header>
  );
}
