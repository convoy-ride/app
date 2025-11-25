"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavViewProps {
  items: NavigationItem[];
}

export default function NavView({ items }: NavViewProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe md:left-0 md:top-20 md:bottom-0 md:w-20 md:border-r md:border-t-0 md:flex md:flex-col md:items-center md:py-6 md:pb-0 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] md:shadow-none">
      <div className="flex justify-around items-center h-16 md:flex-col md:h-auto md:gap-6 md:flex-1 w-full max-w-lg mx-auto md:max-w-none">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-xl transition-smooth md:w-full md:py-3 group relative active-press ${
                isActive
                  ? "text-[#059669]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {/* Active indicator pill (Desktop only) */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#059669] rounded-r-full hidden md:block" />
              )}

              <Icon
                className={`w-6 h-6 transition-all duration-200 ${
                  isActive ? "stroke-[2.5]" : "stroke-2"
                }`}
              />
              <span
                className={`text-[10px] transition-all duration-200 ${
                  isActive ? "font-bold" : "font-medium"
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
