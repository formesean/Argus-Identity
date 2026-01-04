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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg opacity-20 group-hover:opacity-40 blur transition duration-300" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 h-5 w-5 z-10" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="> Enter wallet address to initiate scan..."
              disabled={loading}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-12 pr-32 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono text-sm relative"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-800 text-black font-bold px-6 py-2.5 rounded-md transition-all disabled:cursor-not-allowed font-mono text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
        >
          {loading ? "SCANNING..." : "EXECUTE"}
        </button>
      </form>

      {recentAddresses.length > 0 && (
        <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-cyan-400 font-mono uppercase tracking-wider">
              Recent Scans
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent ml-4" />
          </div>
          <div className="space-y-2">
            {recentAddresses.map((item, index) => (
              <button
                key={index}
                onClick={() => handleRecentClick(item.address)}
                disabled={loading}
                className="w-full text-left px-4 py-3 bg-gray-900/50 hover:bg-gray-900 rounded-md border border-gray-800 hover:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-2 w-2 rounded-full bg-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-gray-400 group-hover:text-cyan-300 font-mono text-sm truncate transition-colors">
                      {item.address}
                    </span>
                  </div>
                  <span className="text-gray-600 group-hover:text-cyan-500 text-xs font-mono whitespace-nowrap transition-colors">
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
