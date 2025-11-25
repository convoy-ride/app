"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Users,
  Car,
  DollarSign,
  Activity,
  Server,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import LogTable from "@/ui/LogTable";
import Leaderboard from "@/ui/Leaderboard";
import PeriodSelector, { Period } from "@/components/PeriodSelector";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import AreaChart from "@/components/charts/AreaChart";
import PieChart from "@/components/charts/PieChart";
import {
  apiResponseTimeData,
  apiCallVolumeData,
  apiSuccessRateData,
  endpointPerformanceData,
  riderActivityLocations,
  topRidersMonth,
  topDriversMonth,
  topRidersYear,
  topDriversYear,
  errorLogs,
  successLogs,
  sparklineData
} from "@/data/mockAnalyticsData";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
      <span className="text-gray-400 font-medium">Loading Map...</span>
    </div>
  )
});

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("month");
  const [logFilter, setLogFilter] = useState<"all" | "errors" | "success">(
    "all"
  );

  // Get leaderboard data based on selected period
  const topRiders = selectedPeriod === "year" ? topRidersYear : topRidersMonth;
  const topDrivers =
    selectedPeriod === "year" ? topDriversYear : topDriversMonth;

  // Filter logs
  const filteredLogs = useMemo(() => {
    if (logFilter === "errors") return errorLogs;
    if (logFilter === "success") return successLogs;
    return [...errorLogs, ...successLogs].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [logFilter]);

  // Map markers for rider activity
  const activityMarkers = riderActivityLocations.map((rider) => ({
    position: [rider.lat, rider.lng] as [number, number],
    popup: `${rider.name} - ${rider.status}`
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="animate-slide-up">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor system performance, user activity, and application health
          </p>
        </div>

        {/* Stats Overview */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <StatsCard
            icon={Users}
            label="Total Users"
            value="12,450"
            trend={{ value: 12.5, isPositive: true }}
            sparklineData={sparklineData.users}
            color="#00B388"
          />
          <StatsCard
            icon={Car}
            label="Active Rides"
            value="324"
            trend={{ value: 8.2, isPositive: true }}
            sparklineData={sparklineData.rides}
            color="#8B5CF6"
          />
          <StatsCard
            icon={DollarSign}
            label="Today's Revenue"
            value="$3,850"
            trend={{ value: 15.3, isPositive: true }}
            sparklineData={sparklineData.revenue}
            color="#F59E0B"
          />
          <StatsCard
            icon={Activity}
            label="System Health"
            value="99.8%"
            trend={{ value: 0.2, isPositive: true }}
            sparklineData={sparklineData.health}
            color="#10B981"
          />
        </div>

        {/* API Performance Section */}
        <div
          className="bg-white p-6 rounded-2xl border border-gray-200 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#00B388]/10 flex items-center justify-center">
              <Server className="w-5 h-5 text-[#00B388]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                API Performance
              </h2>
              <p className="text-sm text-gray-600">
                Response times and success rates
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Time by Service */}
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Response Time by Service (ms)
              </h3>
              <LineChart
                data={apiResponseTimeData}
                xKey="time"
                yKey="trips"
                color="#00B388"
                height={250}
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                API Call Volume
              </h3>
              <BarChart
                data={apiCallVolumeData}
                xKey="endpoint"
                yKey="calls"
                colors="#8B5CF6"
                height={250}
              />
            </div>

            {/* Success/Error Rates */}
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Success vs Error Rate (%)
              </h3>
              <AreaChart
                data={apiSuccessRateData}
                xKey="time"
                yKey={["success", "error"]}
                colors={["#10B981", "#EF4444"]}
                height={250}
                stacked
              />
            </div>

            {/* Endpoint Distribution */}
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Requests by Service
              </h3>
              <PieChart
                data={endpointPerformanceData}
                nameKey="name"
                valueKey="value"
                height={250}
                donut
              />
            </div>
          </div>
        </div>

        {/* Activity Map Section */}
        <div
          className="bg-white p-6 rounded-2xl border border-gray-200 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Real-Time Activity
              </h2>
              <p className="text-sm text-gray-600">
                Current rider locations and active trips
              </p>
            </div>
          </div>

          <div className="h-96 rounded-xl overflow-hidden border border-gray-200">
            <Map
              center={[6.5244, 3.3792]}
              zoom={12}
              size="full"
              markers={activityMarkers}
            />
          </div>
        </div>

        {/* Rider/Driver Analytics */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="min-w-0 overflow-hidden">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 min-w-0">
                Top Performers
              </h2>
              <PeriodSelector
                selected={selectedPeriod}
                onChange={setSelectedPeriod}
              />
            </div>
            <div className="space-y-6">
              <Leaderboard
                title={`Most Active Riders (${
                  selectedPeriod === "year" ? "This Year" : "This Month"
                })`}
                entries={topRiders}
                metricLabel="trips"
              />
              <Leaderboard
                title={`Most Active Drivers (${
                  selectedPeriod === "year" ? "This Year" : "This Month"
                })`}
                entries={topDrivers}
                metricLabel="trips"
              />
            </div>
          </div>

          {/* Logs Section */}
          <div className="min-w-0 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">System Logs</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setLogFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    logFilter === "all"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setLogFilter("errors")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-all duration-200 ${
                    logFilter === "errors"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Errors
                </button>
                <button
                  onClick={() => setLogFilter("success")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-all duration-200 ${
                    logFilter === "success"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Success
                </button>
              </div>
            </div>
            <LogTable logs={filteredLogs} />
          </div>
        </div>
      </div>
    </div>
  );
}
