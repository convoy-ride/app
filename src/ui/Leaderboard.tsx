"use client";

import { Star, Trophy, Medal } from "lucide-react";

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  metric: number;
  subtitle: string;
  rating?: number;
}

interface LeaderboardProps {
  title: string;
  entries: LeaderboardEntry[];
  metricLabel: string;
}

const RANK_ICONS = [
  { Icon: Trophy, color: "#FFD700" }, // Gold
  { Icon: Medal, color: "#C0C0C0" }, // Silver
  { Icon: Medal, color: "#CD7F32" } // Bronze
];

export default function Leaderboard({
  title,
  entries,
  metricLabel
}: LeaderboardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>

      <div className="space-y-3">
        {entries.map((entry, index) => {
          const rankIcon = RANK_ICONS[index];
          const Icon = rankIcon?.Icon;

          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              {/* Rank */}
              <div className="w-8 text-center">
                {Icon ? (
                  <Icon
                    className="w-6 h-6 mx-auto"
                    style={{ color: rankIcon.color }}
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-600">
                    #{index + 1}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B388] to-[#00D9A0] flex items-center justify-center text-white font-bold">
                {entry.avatar || entry.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">{entry.name}</p>
                <p className="text-xs text-gray-500">{entry.subtitle}</p>
              </div>

              {/* Metrics */}
              <div className="text-right">
                <p className="font-black text-gray-900">{entry.metric}</p>
                <p className="text-xs text-gray-500">{metricLabel}</p>
                {entry.rating && (
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                    <span className="text-xs font-semibold text-gray-700">
                      {entry.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
