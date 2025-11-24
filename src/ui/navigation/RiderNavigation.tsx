"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, MessageSquare, CreditCard, User } from "lucide-react";

const navigationItems = [
  {
    name: "Home",
    href: "/rider",
    icon: Home,
  },
  {
    name: "Rides",
    href: "/rider/rides",
    icon: Clock,
  },
  {
    name: "Message",
    href: "/rider/messages",
    icon: MessageSquare,
  },
  {
    name: "Payment",
    href: "/rider/payment",
    icon: CreditCard,
  },
  {
    name: "Account",
    href: "/rider/account",
    icon: User,
  },
];

export default function RiderNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:left-0 md:top-14 md:bottom-0 md:w-20 md:border-r md:border-t-0 md:flex md:flex-col md:items-center md:py-6">
      <div className="flex justify-around items-center h-16 md:flex-col md:h-auto md:gap-6 md:flex-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors duration-200 md:w-full md:py-3 ${isActive
                ? "text-[#00B388]"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
