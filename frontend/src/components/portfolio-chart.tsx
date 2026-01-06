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
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-10 group-hover:opacity-20 blur transition duration-300" />
      <div className="relative bg-gray-950 border border-gray-700 rounded-xl p-5 sm:p-6 backdrop-blur-sm h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="bg-purple-500/20 p-2.5 rounded-lg border border-purple-500/30 flex-shrink-0">
            <PieChartIcon className="h-5 w-5 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-purple-400 font-mono uppercase tracking-wider">
              Portfolio Analysis
            </h3>
            <p className="text-xs text-gray-400 font-mono mt-1">
              {"> Asset distribution breakdown"}
            </p>
          </div>
        </div>

        {/* Chart */}
        {distribution.length > 0 ? (
          <div className="flex-1 min-h-[260px] sm:min-h-[280px] md:min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  cursor="pointer"
                  label={({
                    cx,
                    cy,
                    midAngle = 0,
                    innerRadius,
                    outerRadius,
                    percent,
                    index,
                    name,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      Number(innerRadius) +
                      (Number(outerRadius) - Number(innerRadius)) * 1.4;
                    const x =
                      Number(cx) + radius * Math.cos(-midAngle * RADIAN);
                    const y =
                      Number(cy) + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill={COLORS[index % COLORS.length]}
                        textAnchor={x > Number(cx) ? "start" : "end"}
                        dominantBaseline="central"
                        style={{
                          fontSize: "12px",
                          fontFamily: "monospace",
                          fontWeight: "bold",
                        }}
                      >
                        {`${name}: ${
                          percent !== undefined
                            ? (percent * 100).toFixed(0)
                            : "0"
                        }%`}
                      </text>
                    );
                  }}
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#111827"
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
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    padding: "10px 14px",
                  }}
                  formatter={(value, name, props) => [
                    <span
                      key="value"
                      style={{ color: props.payload.fill, fontWeight: "bold" }}
                    >
                      {value}
                    </span>,
                    <span key="name" style={{ color: props.payload.fill }}>
                      {name}
                    </span>,
                  ]}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: "monospace",
                    fontSize: "12px",
                    paddingTop: "12px",
                  }}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color, fontWeight: 500 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[280px] md:min-h-[320px] border border-gray-700 border-dashed rounded-lg">
            <p className="text-gray-400 font-mono text-sm">
              {"> No distribution data available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
