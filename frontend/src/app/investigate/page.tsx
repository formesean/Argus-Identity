"use client";

import { useState, useEffect } from "react";
import {
  getWalletIdentity,
  getActivityHeatmap,
  getRecentAddresses,
  type WalletPersona,
} from "../actions";
import SearchSection from "@/components/search-section";
import IdentityCard from "@/components/identity-card";
import ActivityGraph from "@/components/activity-graph";
import PortfolioChart from "@/components/portfolio-chart";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InvestigatePage() {
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<WalletPersona | null>(null);
  const [heatmapData, setHeatmapData] = useState<
    Array<{ date: string; count: number; level: number }>
  >([]);
  const [recentAddresses, setRecentAddresses] = useState<
    Array<{ address: string; lastAmount: number }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecentAddresses() {
      try {
        const addresses = await getRecentAddresses();
        setRecentAddresses(addresses);
      } catch (err) {
        console.error("Failed to load recent addresses:", err);
      }
    }
    loadRecentAddresses();
  }, []);

  const handleSearch = async (address: string) => {
    if (!address.trim()) {
      setError("Please enter a wallet address");
      return;
    }

    setLoading(true);
    setError(null);
    setPersona(null);
    setHeatmapData([]);

    try {
      const [personaData, heatmap] = await Promise.all([
        getWalletIdentity(address),
        getActivityHeatmap(address),
      ]);

      setPersona(personaData);
      setHeatmapData(heatmap);
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      setError(
        "Failed to fetch wallet data. Please check the address and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background - fixed to cover all sections */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      <div className="container relative mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
        {/* Header with back button */}
        <header className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-cyan-400 hover:cursor-pointer px-2 sm:px-3"
              >
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Investigation Terminal
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-mono mt-0.5 sm:mt-1 truncate">
                {"> Real-time forensic analysis"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full self-end sm:self-auto">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 font-medium">
              LIVE
            </span>
          </div>
        </header>

        <SearchSection
          onSearch={handleSearch}
          recentAddresses={recentAddresses}
          loading={loading}
        />

        {error && (
          <div className="mt-4 sm:mt-6 md:mt-8 p-4 sm:p-5 bg-red-950/20 border border-red-500/30 rounded-lg text-red-300 font-mono text-sm">
            <span className="text-red-400 font-bold">ERROR:</span> {error}
          </div>
        )}

        {loading && (
          <div className="mt-4 sm:mt-6 md:mt-8 text-center py-10 sm:py-14">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-cyan-950/30 border border-cyan-500/30 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse animation-delay-150" />
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse animation-delay-300" />
              <span className="text-cyan-400 font-mono text-sm ml-2">
                Analyzing blockchain data...
              </span>
            </div>
          </div>
        )}

        {persona && !loading && (
          <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-6">
            <IdentityCard persona={persona} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <ActivityGraph data={heatmapData} />
              <PortfolioChart distribution={persona.distribution} />
            </div>
          </div>
        )}

        {!persona && !loading && !error && (
          <div className="mt-12 sm:mt-16 md:mt-20 text-center px-4">
            <div className="inline-block p-6 sm:p-8 md:p-10 bg-gray-900/50 border border-gray-700 rounded-lg max-w-md w-full">
              <p className="text-gray-300 font-mono text-base sm:text-lg">
                {"> Awaiting wallet address input..."}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-3">
                Enter a Cardano address to begin forensic analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
