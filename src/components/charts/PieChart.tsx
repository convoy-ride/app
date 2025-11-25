"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface PieChartProps {
  data: Record<string, string | number>[];
  nameKey: string;
  valueKey: string;
  colors?: string[];
  height?: number;
  showTooltip?: boolean;
  showLegend?: boolean;
  donut?: boolean;
  innerRadius?: number;
}

const DEFAULT_COLORS = [
  "#00B388",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#EC4899"
];

const CustomTooltip = ({
  active,
  payload
}: {
  active?: boolean;
  payload?: { name: string; value: number; percent?: number }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs font-semibold text-gray-600">{payload[0].name}</p>
        <p className="text-sm font-bold text-gray-900">
          {payload[0].value} ({((payload[0].percent || 0) * 100).toFixed(1)}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({
  payload
}: {
  payload?: { value: string; color: string }[];
}) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-2 mt-4">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-1.5 min-w-0"
        >
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs md:text-sm text-gray-700 truncate">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) => {
  if (
    !cx ||
    !cy ||
    !midAngle ||
    !innerRadius ||
    !outerRadius ||
    !percent ||
    percent < 0.05
  )
    return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChart({
  data,
  nameKey,
  valueKey,
  colors = DEFAULT_COLORS,
  height = 300,
  showTooltip = true,
  showLegend = true,
  donut = false,
  innerRadius = 60
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={height / 3}
          innerRadius={donut ? innerRadius : 0}
          fill="#8884d8"
          dataKey={valueKey}
          nameKey={nameKey}
          animationDuration={1000}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && (
          <Legend
            content={<CustomLegend />}
            wrapperStyle={{ paddingTop: "10px" }}
          />
        )}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
