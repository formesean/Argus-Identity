"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { PieChartIcon } from "lucide-react";

interface PortfolioChartProps {
  distribution: Array<{ name: string; value: number }>;
}

const COLORS = ["#06b6d4", "#a855f7", "#3b82f6", "#10b981"];

export default function PortfolioChart({ distribution }: PortfolioChartProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-10 group-hover:opacity-20 blur transition duration-300" />
      <div className="relative bg-black border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-500/30">
            <PieChartIcon className="h-5 w-5 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-400 font-mono uppercase tracking-wider">
              Portfolio Analysis
            </h3>
            <p className="text-xs text-gray-600 font-mono mt-0.5">
              {"> Asset distribution breakdown"}
            </p>
          </div>
        </div>

        {/* Chart */}
        {distribution.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${
                    percent !== undefined ? (percent * 100).toFixed(0) : "0"
                  }%`
                }
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                stroke="#000"
                strokeWidth={2}
              >
                {distribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  border: "1px solid #1f2937",
                  borderRadius: "8px",
                  color: "#f9fafb",
                  fontFamily: "monospace",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{
                  color: "#9ca3af",
                  fontFamily: "monospace",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-16 border border-gray-800 border-dashed rounded-lg">
            <p className="text-gray-600 font-mono text-sm">
              {"> No distribution data available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
