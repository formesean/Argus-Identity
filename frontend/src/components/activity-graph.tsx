"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { BarChart3 } from "lucide-react";

interface ActivityGraphProps {
  data: Array<{ date: string; count: number; level: number }>;
}

export default function ActivityGraph({ data }: ActivityGraphProps) {
  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-10 group-hover:opacity-20 blur transition duration-300" />
      <div className="relative bg-gray-950 border border-gray-700 rounded-xl p-5 sm:p-6 backdrop-blur-sm h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="bg-cyan-500/20 p-2.5 rounded-lg border border-cyan-500/30 flex-shrink-0">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-cyan-400 font-mono uppercase tracking-wider">
              Activity Matrix
            </h3>
            <p className="text-xs text-gray-400 font-mono mt-1">
              {"> Transaction frequency analysis"}
            </p>
          </div>
        </div>

        {/* Calendar */}
        {data.length > 0 ? (
          <div className="flex-1 flex items-center overflow-x-auto pb-2 -mx-1 px-1 min-h-[260px] sm:min-h-[280px] md:min-h-[320px]">
            <div className="min-w-[300px] w-full">
              <ActivityCalendar
                data={data}
                theme={{
                  light: [
                    "#1f2937",
                    "#065f46",
                    "#0891b2",
                    "#06b6d4",
                    "#22d3ee",
                  ],
                  dark: ["#1f2937", "#065f46", "#0891b2", "#06b6d4", "#22d3ee"],
                }}
                colorScheme="dark"
                blockSize={16}
                blockMargin={5}
                fontSize={12}
                labels={{
                  totalCount: "{{count}} transactions tracked",
                }}
                style={{
                  color: "#9ca3af",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[280px] md:min-h-[320px] border border-gray-700 border-dashed rounded-lg">
            <p className="text-gray-400 font-mono text-sm">
              {"> No activity data detected"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
