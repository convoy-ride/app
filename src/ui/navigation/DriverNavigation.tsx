"use client";

import { Home, Route, User } from "lucide-react";
import NavView, { NavigationItem } from "@/components/NavView";

const navigationItems: NavigationItem[] = [
  {
    name: "Home",
    href: "/driver",
    icon: Home
  },
  {
    name: "Trips",
    href: "/driver/trips",
    icon: Route
  },
  {
    name: "Account",
    href: "/driver/account",
    icon: User
  }
];

export default function DriverNavigation() {
  return <NavView items={navigationItems} />;
}
