"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Navigation2,
  TrendingUp,
  User,
  ArrowLeft,
  Download
} from "lucide-react";
import Button from "@/components/Button";

interface Trip {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  passengerName: string;
  passengerRating: number;
  vehicleType: string;
  earnings: number;
  distance: string;
  duration: string;
  status: "completed" | "cancelled";
  rating?: number;
}

const mockTrips: Trip[] = [
  {
    id: "1",
    date: "2024-11-23",
    time: "10:30 AM",
    from: "123 Main Street, Downtown",
    to: "456 Business Ave, CBD",
    passengerName: "Sarah Johnson",
    passengerRating: 4.9,
    vehicleType: "Comfort",
    earnings: 18.5,
    distance: "8.5 km",
    duration: "15 min",
    status: "completed",
    rating: 5
  },
  {
    id: "2",
    date: "2024-11-23",
    time: "9:15 AM",
    from: "Home - 789 Residential St",
    to: "Airport Terminal 1",
    passengerName: "Mike Chen",
    passengerRating: 5.0,
    vehicleType: "XL",
    earnings: 45.0,
    distance: "25.8 km",
    duration: "35 min",
    status: "completed",
    rating: 5
  },
  {
    id: "3",
    date: "2024-11-22",
    time: "6:45 PM",
    from: "Office - 456 Business Ave",
    to: "Steak Restaurant",
    passengerName: "Emma Wilson",
    passengerRating: 4.7,
    vehicleType: "Premium",
    earnings: 28.0,
    distance: "12.3 km",
    duration: "22 min",
    status: "completed",
    rating: 4
  },
  {
    id: "4",
    date: "2024-11-22",
    time: "2:15 PM",
    from: "Shopping Mall",
    to: "Home",
    passengerName: "John Smith",
    passengerRating: 4.8,
    vehicleType: "Economy",
    earnings: 12.5,
    distance: "5.2 km",
    duration: "12 min",
    status: "completed"
  },
  {
    id: "5",
    date: "2024-11-21",
    time: "11:30 PM",
    from: "Downtown Bar",
    to: "Residential Area",
    passengerName: "David Lee",
    passengerRating: 4.9,
    vehicleType: "Comfort",
    earnings: 15.75,
    distance: "7.1 km",
    duration: "18 min",
    status: "cancelled"
  }
];

export default function DriverTripsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled">(
    "all"
  );

  const filteredTrips = mockTrips.filter((trip) => {
    const matchesSearch =
      trip.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.passengerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || trip.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockTrips.length,
    completed: mockTrips.filter((t) => t.status === "completed").length,
    cancelled: mockTrips.filter((t) => t.status === "cancelled").length,
    totalEarnings: mockTrips
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.earnings, 0)
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 md:pb-8 px-4 md:px-8">
      {/* Floating Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 md:left-28 z-50 bg-white p-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300 group"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
        {/* Tooltip */}
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
          Go Back
        </span>
      </button>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Trip History
          </h1>
          <p className="text-gray-600">
            Track your earnings and completed trips
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-[#00B388]/10 to-[#00B388]/5 p-4 md:p-6 rounded-lg border border-[#00B388]/20 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-[#00B388]" />
              <p className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Total Earnings
              </p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#00B388]">
              ${stats.totalEarnings.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Navigation2 className="w-4 h-4 text-gray-600" />
              <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Total Trips
              </p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {stats.total}
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Completed
              </p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {stats.completed}
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Avg/Trip
              </p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              $
              {stats.completed > 0
                ? (stats.totalEarnings / stats.completed).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location or passenger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-[#00B388] focus:ring-1 focus:ring-[#00B388] transition-all duration-200 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            {(["all", "completed", "cancelled"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200 ${
                  filter === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Trips List */}
        <div className="space-y-3">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white p-5 md:p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        trip.status === "completed"
                          ? "bg-[#00B388] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Navigation2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {trip.vehicleType}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            trip.status === "completed"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-gray-50 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {trip.date} • {trip.time}
                      </p>
                    </div>
                  </div>

                  {/* Earnings */}
                  <div className="text-right">
                    <p className="text-xl font-black text-[#00B388]">
                      ${trip.earnings.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{trip.duration}</p>
                  </div>
                </div>

                {/* Route */}
                <div className="space-y-3 mb-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-2 h-2 rounded-full bg-gray-900" />
                      <div className="w-0.5 h-6 bg-gray-200" />
                      <MapPin className="w-3.5 h-3.5 text-[#00B388]" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          Pickup
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {trip.from}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          Dropoff
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {trip.to}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Distance
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {trip.distance}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {trip.duration}
                    </p>
                  </div>
                </div>

                {/* Passenger Info */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-sm">
                      {trip.passengerName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {trip.passengerName}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                        <span className="text-xs font-medium text-gray-600">
                          {trip.passengerRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating from passenger */}
                  {trip.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 font-medium">
                        Rated you:
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < trip.rating!
                                ? "fill-gray-900 text-gray-900"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No trips found
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "Start driving to see your trip history!"}
              </p>
            </div>
          )}
        </div>

        {/* Export Button */}
        {filteredTrips.length > 0 && (
          <div className="pt-4">
            <Button
              variant="neutral"
              size="md"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export Trip History
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
