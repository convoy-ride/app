"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  DollarSign,
  Clock,
  TrendingUp,
  Navigation2,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  Activity,
  ZapOff,
  Zap
} from "lucide-react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useCurrentLocation } from "@/hooks/utils";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
      <span className="text-gray-400 font-medium">Loading Map...</span>
    </div>
  )
});

interface TripRequest {
  id: string;
  passengerName: string;
  rating: number;
  pickup: string;
  destination: string;
  distance: string;
  estimatedEarnings: number;
  estimatedTime: string;
}

const mockTripRequests: TripRequest[] = [
  {
    id: "1",
    passengerName: "Sarah Johnson",
    rating: 4.9,
    pickup: "123 Main Street, Downtown",
    destination: "456 Business Ave, CBD",
    distance: "8.5 km",
    estimatedEarnings: 18.5,
    estimatedTime: "15 min"
  },
  {
    id: "2",
    passengerName: "Mike Chen",
    rating: 5.0,
    pickup: "789 Residential St",
    destination: "Airport Terminal 1",
    distance: "25.8 km",
    estimatedEarnings: 45.0,
    estimatedTime: "35 min"
  }
];

export default function DriverHome() {
  const [isOnline, setIsOnline] = useState(true);
  const [acceptingRides, setAcceptingRides] = useState(true);
  const [showMobileRequests, setShowMobileRequests] = useState(false);

  // Get current location
  const location = useCurrentLocation();
  const currentLocationMarker = useMemo(
    () => ({
      position: [location.latitude, location.longitude] as [number, number]
    }),
    [location]
  );

  // Mock today's stats
  const todayStats = {
    earnings: 142.5,
    trips: 12,
    hours: 5.5,
    rating: 4.9
  };

  const handleAcceptTrip = (tripId: string) => {
    console.log("Accepting trip:", tripId);
  };

  const handleDeclineTrip = (tripId: string) => {
    console.log("Declining trip:", tripId);
  };

  return (
    <div className="h-screen relative bg-gray-50 flex">
      {/* Map Container */}
      <div className="flex-1 relative">
        <Map
          center={[location.latitude, location.longitude]}
          zoom={20}
          size="full"
          markers={[currentLocationMarker]}
        />

        {/* Online/Offline Toggle - Top Left */}
        <div className="fixed top-28 left-6 md:left-28 z-30 animate-slide-down">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`glassmorphism px-6 py-3.5 rounded-2xl shadow-elevation-3 hover:shadow-elevation-4 hover:scale-105 transition-all duration-300 flex items-center gap-3 font-bold border group active-scale ${
              isOnline
                ? "border-[#00B388]/20 text-[#00B388]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {isOnline ? (
              <>
                <Zap className="w-5 h-5 fill-[#00B388] group-hover:rotate-12 transition-transform duration-300" />
                <span>Online</span>
                <div className="w-2 h-2 rounded-full bg-[#00B388] animate-pulse" />
              </>
            ) : (
              <>
                <ZapOff className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Offline</span>
              </>
            )}
          </button>
        </div>

        {/* Today's Earnings - Top Right */}
        <div
          className="fixed top-28 right-6 z-30 animate-slide-down"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="glassmorphism px-6 py-3.5 rounded-2xl shadow-elevation-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-[#00B388]" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Today
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900">
              ${todayStats.earnings.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Mobile Trip Requests Button - Always visible for testing */}
        <button
          onClick={() => setShowMobileRequests(true)}
          className="md:hidden fixed bottom-[200px] right-4 z-100 w-16 h-16 bg-linear-to-br from-[#00B388] to-[#00D9A0] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center font-bold"
          aria-label="View trip requests"
        >
          <Navigation2 className="w-7 h-7" />
          {/* Badge */}
          {mockTripRequests.length > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-black shadow-md border-2 border-white">
              {mockTripRequests.length}
            </div>
          )}
        </button>
      </div>

      {/* Info Sidebar (Desktop only) */}
      <div className="hidden md:flex flex-col w-96 bg-white border-l border-gray-200 overflow-y-auto custom-scrollbar shadow-elevation-4 pt-20">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="animate-slide-up">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              {isOnline ? "Ready to earn! 💰" : "You're offline"}
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              {isOnline
                ? "Accept rides and start earning"
                : "Go online to start receiving trip requests"}
            </p>
          </div>

          {/* Stats Grid */}
          <div
            className="grid grid-cols-2 gap-3 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="p-4 rounded-2xl bg-linear-to-br from-[#00B388]/10 to-[#00B388]/5 border border-[#00B388]/20">
              <div className="flex items-center gap-2 mb-2">
                <Navigation2 className="w-4 h-4 text-[#00B388]" />
                <span className="text-xs font-bold text-gray-600 uppercase">
                  Trips
                </span>
              </div>
              <p className="text-2xl font-black text-gray-900">
                {todayStats.trips}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-bold text-gray-600 uppercase">
                  Hours
                </span>
              </div>
              <p className="text-2xl font-black text-gray-900">
                {todayStats.hours}h
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                <span className="text-xs font-bold text-gray-600 uppercase">
                  Rating
                </span>
              </div>
              <p className="text-2xl font-black text-gray-900">
                {todayStats.rating}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-linear-to-br from-purple-50 to-white border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-gray-600 uppercase">
                  Avg/Trip
                </span>
              </div>
              <p className="text-2xl font-black text-gray-900">
                ${(todayStats.earnings / todayStats.trips).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Availability Toggle */}
          <div
            className="p-4 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    acceptingRides ? "bg-[#00B388]/10" : "bg-gray-100"
                  }`}
                >
                  <Activity
                    className={`w-5 h-5 ${
                      acceptingRides ? "text-[#00B388]" : "text-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Accepting Rides
                  </p>
                  <p className="text-xs text-gray-500">Toggle ride requests</p>
                </div>
              </div>
              <button
                onClick={() => setAcceptingRides(!acceptingRides)}
                className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                  acceptingRides ? "bg-[#00B388]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    acceptingRides ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Trip Requests */}
          {isOnline && acceptingRides && (
            <div
              className="space-y-3 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-lg font-bold text-gray-900">Trip Requests</h3>
              {mockTripRequests.map((trip, index) => (
                <div
                  key={trip.id}
                  className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  {/* Passenger Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-sm">
                      {trip.passengerName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">
                        {trip.passengerName}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                        <span className="text-xs font-medium text-gray-600">
                          {trip.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-[#00B388]">
                        ${trip.estimatedEarnings.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {trip.estimatedTime}
                      </p>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="space-y-2 mb-4">
                    <div className="flex gap-2">
                      <div className="flex flex-col items-center pt-1">
                        <div className="w-2 h-2 rounded-full bg-gray-900" />
                        <div className="w-0.5 h-6 bg-gray-200" />
                        <MapPin className="w-3 h-3 text-[#00B388]" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Pickup
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {trip.pickup}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Destination
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {trip.destination}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                      <Navigation2 className="w-3.5 h-3.5 text-gray-600" />
                      <span className="text-xs font-semibold text-gray-700">
                        {trip.distance}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      leftIcon={<XCircle className="w-4 h-4" />}
                      onClick={() => handleDeclineTrip(trip.id)}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      leftIcon={<CheckCircle className="w-4 h-4" />}
                      onClick={() => handleAcceptTrip(trip.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Offline Message */}
          {!isOnline && (
            <div
              className="p-6 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-200 text-center animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <ZapOff className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                You&apos;re Offline
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Go online to start receiving trip requests and earning money
              </p>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsOnline(true)}
                leftIcon={<Zap className="w-4 h-4" />}
              >
                Go Online
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet - Stats Quick View */}
      <div className="md:hidden fixed bottom-24 left-4 right-4 z-30 animate-slide-up">
        <div className="glassmorphism p-4 rounded-2xl shadow-elevation-3 border border-gray-200">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-600 mb-1">Trips</p>
              <p className="text-lg font-black text-gray-900">
                {todayStats.trips}
              </p>
            </div>
            <div className="text-center border-x border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-1">Hours</p>
              <p className="text-lg font-black text-gray-900">
                {todayStats.hours}h
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-600 mb-1">Rating</p>
              <p className="text-lg font-black text-gray-900">
                {todayStats.rating}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Trip Requests Modal */}
      <Modal
        isOpen={showMobileRequests}
        onClose={() => setShowMobileRequests(false)}
        title="Trip Requests"
        size="md"
      >
        <div className="space-y-3">
          {mockTripRequests.map((trip) => (
            <div
              key={trip.id}
              className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Passenger Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-sm">
                  {trip.passengerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">
                    {trip.passengerName}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                    <span className="text-xs font-medium text-gray-600">
                      {trip.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-[#00B388]">
                    ${trip.estimatedEarnings.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{trip.estimatedTime}</p>
                </div>
              </div>

              {/* Route */}
              <div className="space-y-2 mb-4">
                <div className="flex gap-2">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2 h-2 rounded-full bg-gray-900" />
                    <div className="w-0.5 h-6 bg-gray-200" />
                    <MapPin className="w-3 h-3 text-[#00B388]" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Pickup
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {trip.pickup}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Destination
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {trip.destination}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <Navigation2 className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs font-semibold text-gray-700">
                    {trip.distance}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  leftIcon={<XCircle className="w-4 h-4" />}
                  onClick={() => {
                    handleDeclineTrip(trip.id);
                    setShowMobileRequests(false);
                  }}
                >
                  Decline
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                  onClick={() => {
                    handleAcceptTrip(trip.id);
                    setShowMobileRequests(false);
                  }}
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
