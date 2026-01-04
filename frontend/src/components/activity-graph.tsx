"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { BarChart3 } from "lucide-react";

interface ActivityGraphProps {
  data: Array<{ date: string; count: number; level: number }>;
}

export default function ActivityGraph({ data }: ActivityGraphProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-10 group-hover:opacity-20 blur transition duration-300" />
      <div className="relative bg-black border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-500/30">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-cyan-400 font-mono uppercase tracking-wider">
              Activity Matrix
            </h3>
            <p className="text-xs text-gray-600 font-mono mt-0.5">
              {"> Transaction frequency analysis"}
            </p>
          </div>
        </div>

        {/* Calendar */}
        {data.length > 0 ? (
          <div className="overflow-x-auto pb-2">
            <ActivityCalendar
              data={data}
              theme={{
                light: ["#0a0a0a", "#064e3b", "#0891b2", "#06b6d4", "#22d3ee"],
                dark: ["#0a0a0a", "#064e3b", "#0891b2", "#06b6d4", "#22d3ee"],
              }}
              colorScheme="dark"
              blockSize={14}
              blockMargin={5}
              fontSize={11}
              labels={{
                totalCount: "{{count}} transactions tracked",
              }}
              style={{
                color: "#6b7280",
              }}
            />
          </div>
        ) : (
          <div className="text-center py-16 border border-gray-800 border-dashed rounded-lg">
            <p className="text-gray-600 font-mono text-sm">
              {"> No activity data detected"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
