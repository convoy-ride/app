"use client";

import { useState } from "react";
import Map from "@/components/Map";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { MapPin, Home, Briefcase, ArrowRight } from "lucide-react";

export default function RiderHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = () => {
    console.log("Pickup:", pickup, "Destination:", destination);
    // Handle ride booking logic here
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen relative">
      <Map
        center={[51.505, -0.09]}
        zoom={13}
        size="full"
      />

      {/* Floating button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 bg-[#00B388] text-white px-6 py-4 rounded-full shadow-lg hover:bg-[#009475] transition-colors duration-200 font-semibold flex items-center gap-2 z-30"
      >
        <MapPin className="w-5 h-5" />
        Where to?
      </button>

      {/* Booking Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Where are you going today?"
        size="sm"
      >
        <div className="space-y-6">
          {/* Pickup Input */}
          <div className="flex items-start gap-3">
            <div className="mt-3">
              <div className="w-3 h-3 rounded-full bg-[#1a1a1a] border-2 border-white shadow-md" />
            </div>
            <div className="flex-1">
              <Input
                placeholder="Choose pick up point"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                variant="filled"
                size="lg"
              />
            </div>
          </div>

          {/* Connecting dots */}
          <div className="ml-1.5 h-8 border-l-2 border-dashed border-gray-300" />

          {/* Destination Input */}
          <div className="flex items-start gap-3">
            <div className="mt-3">
              <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
            </div>
            <div className="flex-1">
              <Input
                placeholder="Choose your destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                variant="filled"
                size="lg"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setPickup("Home");
                setDestination("");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => {
                setPickup("Office");
                setDestination("");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Briefcase className="w-4 h-4" />
              Office
            </button>
          </div>

          {/* Recent Destination */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Steak Restaurant</p>
                <p className="text-sm text-gray-500">8 Norman St, East Sydney, NSW 2010</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-between"
          >
            <span>Choose Your Ride</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}
