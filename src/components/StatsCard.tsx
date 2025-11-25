"use client";

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  sparklineData?: number[];
  color?: string;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  sparklineData,
  color = "#00B388"
}: StatsCardProps) {
  const chartData =
    sparklineData?.map((value, index) => ({ value, index })) || [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              trend.isPositive
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-xs font-bold">{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div className="mb-2">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-3xl font-black text-gray-900">{value}</p>
      </div>

      {sparklineData && sparklineData.length > 0 && (
        <div className="h-12 -mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
