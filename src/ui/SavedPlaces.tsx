"use client";

import { MapPin, Star, Clock, Sparkles } from "lucide-react";

export interface SavedPlace {
  id: string;
  name: string;
  address: string;
  icon: "home" | "work" | "gym" | "restaurant" | "custom";
  category?: string;
}

interface SavedPlacesProps {
  places?: SavedPlace[];
  onSelectPlace?: (place: SavedPlace) => void;
}

const iconMap = {
  home: "🏠",
  work: "💼",
  gym: "💪",
  restaurant: "🍽️",
  custom: "📍",
};

const defaultPlaces: SavedPlace[] = [
  {
    id: "1",
    name: "Home",
    address: "123 Main Street, Downtown",
    icon: "home",
    category: "Frequent",
  },
  {
    id: "2",
    name: "Office",
    address: "456 Business Ave, CBD",
    icon: "work",
    category: "Frequent",
  },
  {
    id: "3",
    name: "Fitness First Gym",
    address: "789 Health Blvd, Midtown",
    icon: "gym",
    category: "Recent",
  },
];

export default function SavedPlaces({
  places = defaultPlaces,
  onSelectPlace,
}: SavedPlacesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-[#00B388] fill-[#00B388]" />
          Saved Places
        </h3>
        <button className="text-sm font-semibold text-[#00B388] hover:text-[#009475] transition-colors duration-300">
          + Add New
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {places.map((place, index) => (
          <button
            key={place.id}
            onClick={() => onSelectPlace?.(place)}
            className="group relative overflow-hidden p-4 rounded-2xl border border-gray-200 hover:border-[#00B388] bg-gradient-to-br from-white to-gray-50 hover:from-[#00B388]/5 hover:to-[#00B388]/10 transition-all duration-300 text-left shadow-elevation-1 hover:shadow-elevation-3 active-scale animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Icon */}
            <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
              {iconMap[place.icon]}
            </div>

            {/* Place Info */}
            <div>
              <p className="font-bold text-gray-900 mb-1 text-sm group-hover:text-[#00B388] transition-colors duration-300">
                {place.name}
              </p>
              <p className="text-xs text-gray-500 line-clamp-2">
                {place.address}
              </p>
            </div>

            {/* Category Badge */}
            {place.category && (
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 bg-[#00B388]/10 text-[#00B388] text-xs font-bold rounded-full">
                  {place.category}
                </span>
              </div>
            )}

            {/* Hover effect */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#00B388]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full blur-xl" />
          </button>
        ))}
      </div>

      {/* Quick Action Footer */}
      <div className="pt-3 border-t border-gray-100">
        <button className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#00B388] text-gray-500 hover:text-[#00B388] font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group">
          <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          Search for a place
        </button>
      </div>
    </div>
  );
}
