"use client";

export type Period = "day" | "week" | "month" | "year";

interface PeriodSelectorProps {
  selected: Period;
  onChange: (period: Period) => void;
}

const PERIODS: { value: Period; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" }
];

export default function PeriodSelector({
  selected,
  onChange
}: PeriodSelectorProps) {
  return (
    <div className="inline-flex items-center gap-1 md:gap-2 p-1 bg-gray-100 rounded-xl flex-shrink-0">
      {PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            selected === period.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
