"use client";

import { TrendingUp, MapPin, Clock, DollarSign } from "lucide-react";

interface RideStats {
  totalRides: number;
  totalSpent: number;
  avgRating: number;
  savedTime: number;
}

interface RideStatsProps {
  stats?: RideStats;
}

const defaultStats: RideStats = {
  totalRides: 127,
  totalSpent: 1849.5,
  avgRating: 4.8,
  savedTime: 38
};

export default function RideStats({ stats = defaultStats }: RideStatsProps) {
  const statItems = [
    {
      label: "Total Rides",
      value: stats.totalRides.toString(),
      icon: MapPin,
      color: "from-[#00D9A0] to-[#00B388]",
      bgColor: "from-[#00B388]/10 to-[#00D9A0]/5"
    },
    {
      label: "Total Spent",
      value: `$${stats.totalSpent.toFixed(0)}`,
      icon: DollarSign,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/5"
    },
    {
      label: "Avg Rating",
      value: stats.avgRating.toFixed(1),
      suffix: "★",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/10 to-orange-500/5"
    },
    {
      label: "Hours Saved",
      value: stats.savedTime.toString(),
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/5"
    }
  ];

  return (
    <div className="glassmorphism-teal rounded-2xl p-5 border border-[#00B388]/20 shadow-elevation-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-gray-900">Your Journey</h3>
        <button className="text-sm font-semibold text-[#00B388] hover:text-[#009475] transition-colors duration-300">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`relative overflow-hidden p-4 rounded-xl bg-gradient-to-br ${item.bgColor} border border-gray-100 hover:shadow-elevation-2 transition-all duration-300 group cursor-pointer active-scale animate-fade-scale`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${item.color} mb-2 shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>

              {/* Value */}
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl font-black bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}
                >
                  {item.value}
                </span>
                {item.suffix && (
                  <span className="text-lg text-yellow-500">{item.suffix}</span>
                )}
              </div>

              {/* Label */}
              <p className="text-xs font-semibold text-gray-600 mt-1">
                {item.label}
              </p>

              {/* Hover gradient overlay */}
              <div
                className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-tl-full blur-xl`}
              />
            </div>
          );
        })}
      </div>

      {/* Achievement badge */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl shadow-md animate-bounce-subtle">
          🏆
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">Gold Member</p>
          <p className="text-xs text-gray-600">Next tier: 23 rides away</p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
              style={{ width: "67%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
