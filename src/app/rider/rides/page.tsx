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
  MoreVertical,
  RotateCcw,
  MessageSquare,
  FileText,
  ArrowLeft
} from "lucide-react";
import Button from "@/components/Button";

interface Ride {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  driverName: string;
  driverRating: number;
  vehicleType: string;
  price: number;
  distance: string;
  duration: string;
  status: "completed" | "cancelled";
  rating?: number;
}

const mockRides: Ride[] = [
  {
    id: "1",
    date: "2024-11-23",
    time: "10:30 AM",
    from: "123 Main Street, Downtown",
    to: "456 Business Ave, CBD",
    driverName: "John Smith",
    driverRating: 4.9,
    vehicleType: "Comfort",
    price: 18.5,
    distance: "8.5 km",
    duration: "15 min",
    status: "completed",
    rating: 5
  },
  {
    id: "2",
    date: "2024-11-22",
    time: "6:45 PM",
    from: "Home - 789 Residential St",
    to: "Steak Restaurant",
    driverName: "Sarah Johnson",
    driverRating: 4.8,
    vehicleType: "Premium",
    price: 28.0,
    distance: "12.3 km",
    duration: "22 min",
    status: "completed",
    rating: 5
  },
  {
    id: "3",
    date: "2024-11-21",
    time: "2:15 PM",
    from: "Office - 456 Business Ave",
    to: "Airport Terminal 1",
    driverName: "Mike Chen",
    driverRating: 5.0,
    vehicleType: "XL",
    price: 45.0,
    distance: "25.8 km",
    duration: "35 min",
    status: "completed",
    rating: 4
  },
  {
    id: "4",
    date: "2024-11-20",
    time: "9:00 AM",
    from: "Home",
    to: "Shopping Mall",
    driverName: "Emma Wilson",
    driverRating: 4.7,
    vehicleType: "Economy",
    price: 12.5,
    distance: "5.2 km",
    duration: "12 min",
    status: "completed"
  },
  {
    id: "5",
    date: "2024-11-19",
    time: "11:30 PM",
    from: "Downtown Bar",
    to: "Home",
    driverName: "David Lee",
    driverRating: 4.9,
    vehicleType: "Comfort",
    price: 15.75,
    distance: "7.1 km",
    duration: "18 min",
    status: "cancelled"
  }
];

export default function RidesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled">(
    "all"
  );

  const filteredRides = mockRides.filter((ride) => {
    const matchesSearch =
      ride.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || ride.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockRides.length,
    completed: mockRides.filter((r) => r.status === "completed").length,
    cancelled: mockRides.filter((r) => r.status === "cancelled").length
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 md:pb-8 px-4 md:px-8">
      {/* Floating Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-28 left-6 md:left-28 z-50 bg-white p-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300 group"
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
            Ride History
          </h1>
          <p className="text-gray-600">
            Track all your journeys and experiences
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1">
              Total Rides
            </p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {stats.total}
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1">
              Completed
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[#00B388]">
              {stats.completed}
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1">
              Cancelled
            </p>
            <p className="text-2xl md:text-3xl font-bold text-gray-400">
              {stats.cancelled}
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
              placeholder="Search by location or driver..."
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

        {/* Rides List */}
        <div className="space-y-3">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride, index) => (
              <div
                key={ride.id}
                className="bg-white p-5 md:p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        ride.status === "completed"
                          ? "bg-[#00B388] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Navigation2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {ride.vehicleType}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            ride.status === "completed"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-gray-50 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {ride.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {ride.date} • {ride.time}
                      </p>
                    </div>
                  </div>

                  {/* Menu */}
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
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
                          From
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {ride.from}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          To
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {ride.to}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Distance
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {ride.distance}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {ride.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Fare
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${ride.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Driver Info */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-sm">
                      {ride.driverName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {ride.driverName}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                        <span className="text-xs font-medium text-gray-600">
                          {ride.driverRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  {ride.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 font-medium">
                        You rated:
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < ride.rating!
                                ? "fill-gray-900 text-gray-900"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="neutral"
                    size="sm"
                    className="flex-1"
                    leftIcon={<RotateCcw className="w-4 h-4" />}
                  >
                    Rebook
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<FileText className="w-4 h-4" />}
                  >
                    Receipt
                  </Button>
                  {ride.status === "completed" && !ride.rating && (
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Star className="w-4 h-4" />}
                    >
                      Rate
                    </Button>
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
                No rides found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "Start your journey with Convoy today!"}
              </p>
              <Button variant="primary" size="md">
                Book a Ride
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
