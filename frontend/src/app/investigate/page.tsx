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
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />

      <div className="container relative mx-auto px-4 py-8 max-w-7xl">
        {/* Header with back button */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-cyan-400"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Investigation Terminal
                </span>
              </h1>
              <p className="text-sm text-gray-500 font-mono mt-1">
                {"> Real-time forensic analysis"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400">LIVE</span>
          </div>
        </header>

        <SearchSection
          onSearch={handleSearch}
          recentAddresses={recentAddresses}
          loading={loading}
        />

        {error && (
          <div className="mt-8 p-4 bg-red-950/20 border border-red-500/30 rounded-lg text-red-300 font-mono text-sm">
            <span className="text-red-400 font-bold">ERROR:</span> {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 text-center py-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg">
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
          <div className="mt-8 space-y-6">
            <IdentityCard persona={persona} />

            <div className="grid lg:grid-cols-2 gap-6">
              <ActivityGraph data={heatmapData} />
              <PortfolioChart distribution={persona.distribution} />
            </div>
          </div>
        )}

        {!persona && !loading && !error && (
          <div className="mt-20 text-center">
            <div className="inline-block p-8 bg-gray-950/50 border border-gray-800 rounded-lg">
              <p className="text-gray-500 font-mono">
                {"> Awaiting wallet address input..."}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Enter a Cardano address to begin forensic analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
