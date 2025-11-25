"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface LineChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  gradient?: boolean;
}

const CustomTooltip = ({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs font-semibold text-gray-600">{label}</p>
        <p className="text-sm font-bold text-gray-900">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function LineChart({
  data,
  xKey,
  yKey,
  color = "#00B388",
  height = 300,
  showGrid = true,
  showTooltip = true,
  gradient = true
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
      >
        {gradient && (
          <defs>
            <linearGradient
              id={`lineGradient-${color}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.2} />
            </linearGradient>
          </defs>
        )}
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12, fill: "#6B7280" }}
          tickLine={false}
          axisLine={{ stroke: "#E5E7EB" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#6B7280" }}
          tickLine={false}
          axisLine={{ stroke: "#E5E7EB" }}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={3}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6, fill: color }}
          animationDuration={1000}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
