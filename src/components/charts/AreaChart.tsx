"use client";

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface AreaChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string | string[];
  colors?: string | string[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  stacked?: boolean;
}

const CustomTooltip = ({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-1">{label}</p>
        {payload.map(
          (
            entry: { name: string; value: number; color: string },
            index: number
          ) => (
            <p
              key={index}
              className="text-sm font-bold"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
            </p>
          )
        )}
      </div>
    );
  }
  return null;
};

export default function AreaChart({
  data,
  xKey,
  yKey,
  colors = "#00B388",
  height = 300,
  showGrid = true,
  showTooltip = true,
  stacked = false
}: AreaChartProps) {
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];
  const colorArray = Array.isArray(colors) ? colors : [colors];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={data}
        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
      >
        <defs>
          {colorArray.map((color, index) => (
            <linearGradient
              key={index}
              id={`areaGradient-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>
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
        {yKeys.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colorArray[index % colorArray.length]}
            strokeWidth={2}
            fill={`url(#areaGradient-${index % colorArray.length})`}
            stackId={stacked ? "1" : undefined}
            animationDuration={1000}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
