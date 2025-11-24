"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, CreditCard, User } from "lucide-react";

const navigationItems = [
  {
    name: "Home",
    href: "/rider",
    icon: Home
  },
  {
    name: "Rides",
    href: "/rider/rides",
    icon: Clock
  },
  {
    name: "Payment",
    href: "/rider/payment",
    icon: CreditCard
  },
  {
    name: "Account",
    href: "/rider/account",
    icon: User
  }
];

export default function RiderNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glassmorphism border-t border-gray-100/50 z-40 shadow-elevation-3 md:left-0 md:top-14 md:bottom-0 md:w-20 md:border-r md:border-t-0 md:flex md:flex-col md:items-center md:py-6">
      <div className="flex justify-around items-center h-16 md:flex-col md:h-auto md:gap-6 md:flex-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 md:w-full md:py-3 group relative active-scale ${
                isActive
                  ? "text-[#00B388] bg-[#00B388]/10"
                  : "text-gray-600 hover:text-[#00B388] hover:bg-gray-50"
              }`}
            >
              {/* Active indicator pill */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#00B388] to-[#00D9A0] rounded-r-full hidden md:block animate-slide-in-right" />
              )}

              <Icon
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive
                    ? "stroke-[2.5] scale-110"
                    : "group-hover:scale-110 group-hover:rotate-6"
                }`}
              />
              <span
                className={`text-xs transition-all duration-300 ${
                  isActive
                    ? "font-bold"
                    : "font-medium group-hover:font-semibold"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
