"use client";

import { TrendingUp, Percent, Clock, Sparkles, X } from "lucide-react";
import { useState } from "react";

interface PromoOffer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  expiry: string;
  gradient: string;
}

const offers: PromoOffer[] = [
  {
    id: "1",
    title: "Weekend Special",
    description: "20% off on all rides",
    code: "WEEKEND20",
    discount: "20%",
    expiry: "Expires in 2 days",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "2",
    title: "First Ride Free",
    description: "Get your first premium ride free",
    code: "PREMIUM1ST",
    discount: "100%",
    expiry: "Valid for new users",
    gradient: "from-[#00D9A0] to-[#00B388]"
  }
];

export default function PromoBanner() {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || offers.length === 0) return null;

  const offer = offers[currentOffer];

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-elevation-4 animate-slide-up">
      {/* Background Gradient */}
      <div className={`bg-gradient-to-br ${offer.gradient} p-6 relative`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse-ring" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" />
        </div>

        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-300 active-scale z-10"
          aria-label="Dismiss offer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">Limited Offer</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white mb-1">
                {offer.title}
              </h3>
              <p className="text-white/90 text-sm font-medium mb-3">
                {offer.description}
              </p>

              {/* Promo Code */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <span className="text-xs text-white/70 font-semibold">
                  CODE:
                </span>
                <span className="text-sm font-black text-white tracking-wider">
                  {offer.code}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(offer.code)}
                  className="ml-2 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-md text-xs font-bold text-white transition-all duration-300 active-scale"
                >
                  Copy
                </button>
              </div>

              {/* Expiry */}
              <div className="flex items-center gap-2 mt-3">
                <Clock className="w-3.5 h-3.5 text-white/70" />
                <span className="text-xs text-white/70 font-medium">
                  {offer.expiry}
                </span>
              </div>
            </div>

            {/* Discount Badge */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex flex-col items-center justify-center shadow-elevation-3 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <Percent className="w-6 h-6 text-white mb-1" />
                <span className="text-2xl font-black text-white">
                  {offer.discount}
                </span>
                <span className="text-xs text-white/70 font-bold">OFF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        {offers.length > 1 && (
          <div className="flex gap-2 mt-4 relative z-10">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentOffer(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentOffer
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Offer ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
