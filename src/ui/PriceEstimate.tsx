"use client";

import { DollarSign, TrendingUp, Clock, MapPin } from "lucide-react";

export interface PriceEstimateProps {
  baseFare: number;
  distance: number;
  duration: number;
  surge?: number;
  discount?: number;
  currency?: string;
}

export default function PriceEstimate({
  baseFare,
  distance,
  duration,
  surge = 0,
  discount = 0,
  currency = "$",
}: PriceEstimateProps) {
  const subtotal = baseFare + (distance * 0.5) + (duration * 0.2);
  const surgeAmount = subtotal * (surge / 100);
  const total = subtotal + surgeAmount - discount;

  return (
    <div className="glassmorphism-teal rounded-2xl p-5 space-y-4 border border-[#00B388]/20 shadow-elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#00B388]/20">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#00B388]" />
          Fare Breakdown
        </h3>
        {surge > 0 && (
          <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            {surge}% Surge
          </div>
        )}
      </div>

      {/* Breakdown Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00B388]" />
            Base Fare
          </span>
          <span className="font-semibold text-gray-900">{currency}{baseFare.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            Distance ({distance.toFixed(1)} km)
          </span>
          <span className="font-semibold text-gray-900">{currency}{(distance * 0.5).toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Time ({duration} min)
          </span>
          <span className="font-semibold text-gray-900">{currency}{(duration * 0.2).toFixed(2)}</span>
        </div>

        {surge > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-orange-600 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Surge Pricing
            </span>
            <span className="font-semibold text-orange-600">+{currency}{surgeAmount.toFixed(2)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">%</div>
              Discount
            </span>
            <span className="font-semibold text-green-600">-{currency}{discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="pt-3 border-t border-[#00B388]/20">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">Total Estimate</span>
          <span className="text-2xl font-bold gradient-text-vibrant animate-gradient">
            {currency}{total.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">Final price may vary</p>
      </div>
    </div>
  );
}
