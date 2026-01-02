"use client";

import { AlternatingCards } from "@/components/alternating-cards";
import { Card } from "@/components/ui/card";
import { Fingerprint, Target, Zap } from "lucide-react";
import { Suspense } from "react";

function Content() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Main content */}
      <div className="container relative mx-auto px-4 py-16 max-w-7xl">
        <header className="mb-20 text-center">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Behavioral Profiling Engine Active
              </span>
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              ARGUS
            </span>
            <br />
            <span className="text-white/90">IDENTITY</span>
          </h1>

          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            <span className="text-cyan-400 font-semibold">
              Who is this user?
            </span>
          </p>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-mono">
            {
              "> Behavioral Profiling for Cardano Wallets. Moving beyond raw data display to derived insights."
            }
          </p>

          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 font-mono">
                Insight-Driven
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Not just data display
              </div>
            </div>
            <div className="h-12 w-px bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 font-mono">
                Research-First
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Algorithm-powered analysis
              </div>
            </div>
          </div>
        </header>

        <AlternatingCards />

        <div className="mb-12 mt-24">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">
            The Persona Engine
          </h2>
          <p className="text-gray-400 text-center mb-8 font-mono">
            3 core analysis modules that reveal wallet identity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Heatmap Module */}
          <Card className="hover:cursor-pointer group relative p-8 bg-gray-950/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-4 inline-flex p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                <Target className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                Activity Heatmap
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-mono mb-4">
                GitHub-style contribution graph showing active vs. dormant days
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span className="text-gray-500">
                    Bot Detection: 24/7 activity patterns
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span className="text-gray-500">
                    Human Behavior: Weekends only
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Archetype Module */}
          <Card className="hover:cursor-pointer group relative p-8 bg-gray-950/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-4 inline-flex p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <Fingerprint className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                User Archetype (Classification)
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-mono mb-4">
                Heuristics engine assigning behavioral badges based on data
                patterns
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 bg-purple-500/20 rounded text-purple-300">
                    The Grinder
                  </div>
                  <span className="text-gray-600">→ High Tx + Low Balance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 bg-purple-500/20 rounded text-purple-300">
                    The Vault
                  </div>
                  <span className="text-gray-600">
                    → Zero Outgoing + High Balance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 bg-purple-500/20 rounded text-purple-300">
                    The Trader
                  </div>
                  <span className="text-gray-600">→ High DEX Interaction</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Portfolio Module */}
          <Card className="hover:cursor-pointer group relative p-8 bg-gray-950/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-4 inline-flex p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                Portfolio Distribution
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-mono mb-4">
                Pie chart showing where their money goes
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span className="text-gray-500">
                    Sum of UTXO inputs vs. outputs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span className="text-gray-500">
                    Gas fees vs. Value transfer
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats bar */}
        <Card className="mt-12 p-6 bg-gray-950/50 border-gray-800 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-cyan-400 font-mono">
                Prisma ORM
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Direct PostgreSQL Access
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 font-mono">
                3 Modules
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Heatmap, Archetype, Portfolio
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 font-mono">
                Zero Lag
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Local Infrastructure
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                Argus Indexed
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Cardano Mainnet Data
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
