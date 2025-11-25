"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  LogOut,
  Globe,
  MapPin,
  Shield,
  HelpCircle
} from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function AccountPage() {
  const router = useRouter();
  const [view, setView] = useState<"menu" | "profile">("menu");
  const [formData, setFormData] = useState({
    name: "Nate Samson",
    email: "nate@email.com",
    phone: "202-555-0123",
    gender: "Male",
    address: "123 Main St, New York, NY 10001"
  });

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setView("menu");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/");
  };

  if (view === "profile") {
    return (
      <div className="min-h-screen bg-white pt-28 pb-24 md:pb-8 px-4 md:px-8">
        <button
          onClick={() => setView("menu")}
          className="fixed top-6 left-6 md:left-28 z-50 bg-white p-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="max-w-xl mx-auto animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-[#00B388]/20 p-1">
                <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nate&backgroundColor=c0aede"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#00B388] rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-[#009475] transition-colors duration-200">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full"
                variant="outline"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full"
                variant="outline"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-gray-600 font-medium min-w-[80px]">
                  <span className="mr-1">🇺🇸</span>
                  <span>+1</span>
                  <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
                </div>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-l-none"
                  variant="outline"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Gender
              </label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 appearance-none focus:border-[#00B388] focus:ring-2 focus:ring-[#00B388]/20 outline-none transition-all duration-200"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Address
              </label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full"
                variant="outline"
              />
            </div>
            <div className="pt-6">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24 md:pb-8 px-4 md:px-8">
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 md:left-28 z-50 bg-white p-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300 group"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 animate-slide-up">
          <div className="w-20 h-20 rounded-full border-2 border-[#00B388]/20 p-0.5">
            <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nate&backgroundColor=c0aede"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
            <p className="text-gray-500 text-sm mb-2">{formData.email}</p>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-[#00B388]/10 text-[#00B388] text-xs font-bold">
                Gold Member
              </span>
              <span className="text-xs text-gray-400">★ 4.9 Rating</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className="grid grid-cols-3 gap-4 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">142</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Rides
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">48h</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Time
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-[#00B388]">2.4k</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Points
            </p>
          </div>
        </div>

        {/* Menu List */}
        <div
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          {[
            {
              icon: <Camera className="w-5 h-5" />,
              label: "Personal Info",
              action: () => setView("profile")
            },
            {
              icon: <MapPin className="w-5 h-5" />,
              label: "Saved Places",
              action: () => console.log("Saved Places")
            },
            {
              icon: <Globe className="w-5 h-5" />,
              label: "Change Language",
              action: () => console.log("Change Language")
            },
            {
              icon: <Shield className="w-5 h-5" />,
              label: "Privacy & Security",
              action: () => console.log("Privacy")
            },
            {
              icon: <HelpCircle className="w-5 h-5" />,
              label: "Help & Support",
              action: () => console.log("Help")
            },
            {
              icon: <LogOut className="w-5 h-5" />,
              label: "Log Out",
              action: handleLogout,
              danger: true
            }
          ].map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors duration-200 ${
                i !== 0 ? "border-t border-gray-100" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.danger
                    ? "bg-red-50 text-red-500"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`flex-1 text-left font-semibold ${
                  item.danger ? "text-red-500" : "text-gray-900"
                }`}
              >
                {item.label}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-300 -rotate-90" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
