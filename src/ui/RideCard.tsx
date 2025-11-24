"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Users, Clock, Star } from "lucide-react";

const rideCardVariants = cva(
  "relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group",
  {
    variants: {
      selected: {
        true: "border-[#00B388] bg-[#00B388]/5 shadow-elevation-3 ring-2 ring-[#00B388]/30",
        false: "border-gray-200 bg-white hover:border-[#00B388]/50 hover:shadow-elevation-2 active-scale",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

export interface RideCardProps extends VariantProps<typeof rideCardVariants> {
  vehicleType: string;
  description: string;
  capacity: number;
  estimatedTime: string;
  priceEstimate: string;
  badge?: string;
  imageUrl?: string;
  onSelect?: () => void;
}

export default function RideCard({
  vehicleType,
  description,
  capacity,
  estimatedTime,
  priceEstimate,
  badge,
  imageUrl,
  selected,
  onSelect,
}: RideCardProps) {
  return (
    <div
      className={rideCardVariants({ selected })}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
    >
      <div className="p-4 flex items-center gap-4">
        {/* Vehicle Icon/Image */}
        <div className="relative">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${selected
              ? "bg-gradient-to-br from-[#00B388] to-[#00D9A0] text-white shadow-glow"
              : "bg-gray-100 text-gray-600 group-hover:bg-[#00B388]/10 group-hover:text-[#00B388]"
            }`}>
            {imageUrl ? (
              <img src={imageUrl} alt={vehicleType} className="w-12 h-12 object-contain" />
            ) : (
              <Users className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>

          {/* Badge */}
          {badge && (
            <div className="absolute -top-1 -right-1 px-2 py-0.5 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white text-xs font-bold rounded-full shadow-md animate-pulse-ring">
              {badge}
            </div>
          )}
        </div>

        {/* Vehicle Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-base font-bold transition-colors duration-300 ${selected ? "text-[#00B388]" : "text-gray-900 group-hover:text-[#00B388]"
              }`}>
              {vehicleType}
            </h3>
            {/* Rating stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-600 mb-2">{description}</p>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{capacity}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <div className={`text-lg font-bold transition-colors duration-300 ${selected ? "text-[#00B388]" : "text-gray-900"
            }`}>
            {priceEstimate}
          </div>
          <div className="text-xs text-gray-500">Estimated</div>
        </div>
      </div>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-l-[40px] border-t-[#00B388] border-l-transparent">
          <div className="absolute -top-[36px] -right-[2px] text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
