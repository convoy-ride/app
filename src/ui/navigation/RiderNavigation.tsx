"use client";

import { Home, Clock, CreditCard, User } from "lucide-react";
import NavView, { NavigationItem } from "@/components/NavView";

const navigationItems: NavigationItem[] = [
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
  return <NavView items={navigationItems} />;
}
