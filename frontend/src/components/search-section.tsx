"use client";

import type React from "react";
import { useState } from "react";
import { Search, Clock } from "lucide-react";

interface SearchSectionProps {
  onSearch: (address: string) => void;
  recentAddresses: Array<{ address: string; lastAmount: number }>;
  loading: boolean;
}

export default function SearchSection({
  onSearch,
  recentAddresses,
  loading,
}: SearchSectionProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleRecentClick = (address: string) => {
    setInputValue(address);
    onSearch(address);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg opacity-20 group-hover:opacity-40 blur transition duration-300" />
          <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-cyan-400 h-4 w-4 sm:h-5 sm:w-5 z-10" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="> Enter wallet address..."
                disabled={loading}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg sm:rounded-r-none pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono text-sm relative"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="hover:cursor-pointer sm:relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-800 text-black font-bold px-5 sm:px-8 py-3.5 sm:py-4 rounded-lg sm:rounded-l-none transition-all disabled:cursor-not-allowed font-mono text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 w-full sm:w-auto"
            >
              {loading ? "SCANNING..." : "EXECUTE"}
            </button>
          </div>
        </div>
      </form>

      {recentAddresses.length > 0 && (
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <Clock className="h-5 w-5 text-cyan-400 flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-cyan-400 font-mono uppercase tracking-wider">
              Recent Scans
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent ml-3 hidden sm:block" />
          </div>
          <div className="space-y-2.5">
            {recentAddresses.map((item, index) => (
              <button
                key={index}
                onClick={() => handleRecentClick(item.address)}
                disabled={loading}
                className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-2 w-2 rounded-full bg-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    <span className="text-gray-300 group-hover:text-cyan-300 font-mono text-xs sm:text-sm truncate transition-colors">
                      {item.address}
                    </span>
                  </div>
                  <span className="text-gray-400 group-hover:text-cyan-400 text-xs sm:text-sm font-mono whitespace-nowrap transition-colors flex-shrink-0">
                    {item.lastAmount.toFixed(2)} ₳
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
