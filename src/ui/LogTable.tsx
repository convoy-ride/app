"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "error" | "success" | "warning" | "info";
  service: string;
  message: string;
  details?: string;
}

interface LogTableProps {
  logs: LogEntry[];
}

const LEVEL_COLORS = {
  error: "bg-red-50 text-red-700 border-red-200",
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
  info: "bg-blue-50 text-blue-700 border-blue-200"
};

export default function LogTable({ logs }: LogTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const filteredLogs = logs.filter(
    (log) =>
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-[#00B388] focus:ring-2 focus:ring-[#00B388]/20 outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-auto max-h-96">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                Level
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                Service
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                Message
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wide w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLogs.map((log) => (
              <>
                <tr
                  key={log.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() =>
                    setExpandedLog(expandedLog === log.id ? null : log.id)
                  }
                >
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-bold rounded-lg border ${
                        LEVEL_COLORS[log.level]
                      }`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {log.service}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {log.message}
                  </td>
                  <td className="px-4 py-3">
                    {log.details && (
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          expandedLog === log.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </td>
                </tr>
                {expandedLog === log.id && log.details && (
                  <tr>
                    <td colSpan={5} className="px-4 py-3 bg-gray-50">
                      <div className="text-sm text-gray-700 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="font-semibold mb-2">Details:</p>
                        <pre className="whitespace-pre-wrap text-xs">
                          {log.details}
                        </pre>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">No logs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
