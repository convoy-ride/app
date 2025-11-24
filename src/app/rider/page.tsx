"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
      <span className="text-gray-400 font-medium">Loading Map...</span>
    </div>
  )
});
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import RideCard from "@/ui/RideCard";
import PriceEstimate from "@/ui/PriceEstimate";
import PromoBanner from "@/ui/PromoBanner";
import RideStats from "@/ui/RideStats";
import SavedPlaces from "@/ui/SavedPlaces";
import {
  MapPin,
  Home,
  Briefcase,
  ArrowRight,
  Clock,
  Package,
  Sparkles,
  Navigation,
  Zap
} from "lucide-react";
import { useCurrentLocation } from "@/hooks/utils";

const rideOptions = [
  {
    id: "economy",
    vehicleType: "Economy",
    description: "Affordable rides for everyday travel",
    capacity: 4,
    estimatedTime: "3 min",
    priceEstimate: "$12.50",
    badge: undefined
  },
  {
    id: "comfort",
    vehicleType: "Comfort",
    description: "Premium cars with extra space",
    capacity: 4,
    estimatedTime: "5 min",
    priceEstimate: "$18.00",
    badge: "Popular"
  },
  {
    id: "premium",
    vehicleType: "Premium",
    description: "Luxury vehicles for special occasions",
    capacity: 4,
    estimatedTime: "7 min",
    priceEstimate: "$28.00",
    badge: undefined
  },
  {
    id: "xl",
    vehicleType: "XL",
    description: "Extra space for groups and luggage",
    capacity: 6,
    estimatedTime: "6 min",
    priceEstimate: "$22.00",
    badge: undefined
  }
];

export default function RiderHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRides, setShowRides] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [selectedRide, setSelectedRide] = useState<string | null>(null);

  // Get current location
  const location = useCurrentLocation();
  const currentLocationMarker = useMemo(
    () => ({
      position: [location.latitude, location.longitude] as [number, number]
    }),
    [location]
  );

  const handleContinue = () => {
    if (pickup && destination) {
      setShowRides(true);
    }
  };

  const handleBookRide = () => {
    if (selectedRide) {
      console.log("Booking ride:", {
        pickup,
        destination,
        scheduledDate,
        rideType: selectedRide
      });
      setIsModalOpen(false);
      setShowRides(false);
      setSelectedRide(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowRides(false);
    setSelectedRide(null);
  };

  return (
    <div className="h-screen relative bg-gray-50 flex">
      {/* Map Container */}
      <div className="flex-1 relative">
        <Map
          center={[location.latitude, location.longitude]}
          zoom={13}
          size="full"
          markers={[currentLocationMarker]}
        />

        {/* Premium floating action buttons */}
        <div className="fixed bottom-24 md:bottom-6 right-6 flex flex-col gap-3 z-30 animate-slide-up">
          {/* Quick Stats button (mobile only) */}
          <button className="md:hidden glassmorphism text-gray-700 px-5 py-3 rounded-2xl shadow-elevation-3 hover:shadow-elevation-4 hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold border border-gray-200 group active-scale">
            <Zap className="w-4 h-4 text-[#00B388] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm">127 rides</span>
          </button>

          {/* Delivery button */}
          <button
            onClick={() => console.log("Delivery clicked")}
            className="glassmorphism text-[#00B388] px-6 py-3.5 rounded-2xl shadow-elevation-3 hover:shadow-elevation-4 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 font-semibold border border-[#00B388]/20 group active-scale relative"
          >
            <Package className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300" />
            <span>Delivery</span>
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
              Send packages
            </span>
          </button>

          {/* Ride button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="gradient-primary text-white px-6 py-3.5 rounded-2xl shadow-glow hover:shadow-glow hover:scale-110 transition-all duration-300 animate-gradient flex items-center gap-2.5 font-bold group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 active-scale"
          >
            <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Where to?</span>
            <Sparkles className="w-4 h-4 absolute top-1 right-1 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Premium Info Sidebar (Desktop only) */}
      <div className="hidden md:flex flex-col w-96 bg-white border-l border-gray-200 overflow-y-auto custom-scrollbar shadow-elevation-4 pt-20">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="animate-slide-up">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Welcome back! 👋
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Ready for your next journey?
            </p>
          </div>

          {/* Promo Banner */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <PromoBanner />
          </div>

          {/* Ride Stats */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <RideStats />
          </div>

          {/* Saved Places */}
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <SavedPlaces
              onSelectPlace={(place) => {
                setPickup(place.name);
                setIsModalOpen(true);
              }}
            />
          </div>

          {/* Quick Actions */}
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-elevation-1">
              <h4 className="text-sm font-bold text-gray-900 mb-3">
                Quick Actions
              </h4>
              <div className="space-y-2">
                <button className="w-full p-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-left transition-all duration-300 group flex items-center gap-3 shadow-sm hover:shadow-md active-scale">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B388] to-[#00D9A0] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">
                      Schedule Ride
                    </p>
                    <p className="text-xs text-gray-500">Plan ahead</p>
                  </div>
                </button>
                <button className="w-full p-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-left transition-all duration-300 group flex items-center gap-3 shadow-sm hover:shadow-md active-scale">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">
                      Send Package
                    </p>
                    <p className="text-xs text-gray-500">Same-day delivery</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={showRides ? "Choose your ride" : "Where are you going?"}
        size={showRides ? "md" : "sm"}
      >
        {!showRides ? (
          <div className="space-y-5">
            {/* Route Selection Section */}
            <div className="space-y-0 glassmorphism-teal p-5 rounded-2xl border border-[#00B388]/20">
              {/* Pickup Input */}
              <div
                className="flex items-start gap-3 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="mt-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#0f172a] to-gray-600 border-2 border-white shadow-elevation-2 animate-pulse-ring" />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Choose pick up point"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    variant="premium"
                    size="lg"
                  />
                </div>
              </div>

              {/* Connecting line */}
              <div className="ml-1.5 h-6 border-l-2 border-dashed border-[#00B388]/30" />

              {/* Destination Input */}
              <div
                className="flex items-start gap-3 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="mt-3">
                  <Navigation className="w-4 h-4 text-[#00B388] fill-[#00B388] animate-bounce-subtle" />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Choose your destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    variant="premium"
                    size="lg"
                  />
                </div>
              </div>

              {/* Connecting line */}
              <div className="ml-1.5 h-6 border-l-2 border-dashed border-[#00B388]/30" />

              {/* Schedule Date Input */}
              <div
                className="flex items-start gap-3 animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="mt-3">
                  <Clock className="w-4 h-4 text-[#00B388]" />
                </div>
                <div className="flex-1">
                  <Input
                    type="datetime-local"
                    placeholder="Schedule for later (optional)"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    variant="premium"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className="flex gap-3 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <button
                onClick={() => {
                  setPickup("Home");
                  setDestination("");
                }}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-br from-[#0f172a] to-gray-800 text-white rounded-xl text-sm font-bold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-elevation-2 hover:shadow-elevation-3 hover:scale-105 group active-scale"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Home
              </button>
              <button
                onClick={() => {
                  setPickup("Office");
                  setDestination("");
                }}
                className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all duration-300 border border-gray-200 shadow-elevation-1 hover:shadow-elevation-2 hover:scale-105 group active-scale"
              >
                <Briefcase className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Office
              </button>
            </div>

            {/* Recent Destinations */}
            <div
              className="pt-2 border-t border-gray-100 animate-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              <h3 className="text-sm font-bold text-gray-500 mb-3 px-1">
                Recent
              </h3>
              <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-300 group border border-transparent hover:border-[#00B388]/20 hover:shadow-elevation-2 active-scale">
                <div className="mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B388]/10 to-[#00B388]/5 flex items-center justify-center group-hover:from-[#00B388]/20 group-hover:to-[#00B388]/10 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-[#00B388]" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Steak Restaurant</p>
                  <p className="text-sm text-gray-500">
                    8 Norman St, East Sydney, NSW 2010
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>

            {/* Continue Button */}
            <div
              className="animate-slide-up pt-2"
              style={{ animationDelay: "0.6s" }}
            >
              <Button
                onClick={handleContinue}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={!pickup || !destination}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Ride Options */}
            <div className="space-y-3 animate-fade-scale">
              {rideOptions.map((ride, index) => (
                <div
                  key={ride.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RideCard
                    {...ride}
                    selected={selectedRide === ride.id}
                    onSelect={() => setSelectedRide(ride.id)}
                  />
                </div>
              ))}
            </div>

            {/* Price Estimate */}
            {selectedRide && (
              <div className="animate-fade-scale">
                <PriceEstimate
                  baseFare={5.0}
                  distance={8.5}
                  duration={15}
                  surge={selectedRide === "premium" ? 20 : 0}
                  discount={0}
                  currency="$"
                />
              </div>
            )}

            {/* Book Ride Button */}
            <div className="animate-slide-up">
              <Button
                onClick={handleBookRide}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={!selectedRide}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Confirm Ride
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
