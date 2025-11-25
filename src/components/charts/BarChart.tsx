"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface BarChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string | string[];
  colors?: string | string[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  horizontal?: boolean;
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
        {payload.map((entry, index) => (
          <p
            key={index}
            className="text-sm font-bold"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BarChart({
  data,
  xKey,
  yKey,
  colors = "#00B388",
  height = 300,
  showGrid = true,
  showTooltip = true,
  horizontal = false
}: BarChartProps) {
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];
  const colorArray = Array.isArray(colors) ? colors : [colors];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ top: 5, right: 5, left: horizontal ? 0 : -20, bottom: 5 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        {horizontal ? (
          <>
            <XAxis type="number" tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis
              dataKey={xKey}
              type="category"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              width={100}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {yKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colorArray[index % colorArray.length]}
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
