"use client";

import { AlternatingCards } from "@/components/alternating-cards";
import { Fingerprint, Target, Zap } from "lucide-react";
import { Suspense } from "react";

function Content() {
  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory bg-black text-white">
      {/* Animated background - fixed to cover all sections */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      {/* Section 1: Header */}
      <section className="min-h-screen snap-start snap-always flex items-center justify-center relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <header className="text-center">
            <div className="inline-block mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Behavioral Profiling Engine Active
                </span>
              </div>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                ARGUS
              </span>
              <br />
              <span className="text-white/90">IDENTITY</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-3 sm:mb-4">
              <span className="text-cyan-400 font-semibold">
                Who is this user?
              </span>
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-mono px-2">
              {
                "> Behavioral Profiling for Cardano Wallets. Moving beyond raw data display to derived insights."
              }
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-400 font-mono">
                  Insight-Driven
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Not just data display
                </div>
              </div>
              <div className="hidden sm:block h-12 w-px bg-gray-700" />
              <div className="sm:hidden w-16 h-px bg-gray-700" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 font-mono">
                  Research-First
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Algorithm-powered analysis
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>

      {/* Section 2: Alternating Cards */}
      <section className="min-h-screen snap-start snap-always flex items-center justify-center relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl w-full">
          <AlternatingCards />
        </div>
      </section>

      {/* Section 3: Persona Engine + Stats */}
      <section className="min-h-screen snap-start snap-always flex items-center justify-center relative py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div aria-labelledby="persona-engine-heading">
            <header className="mb-8 sm:mb-12">
              <h2
                id="persona-engine-heading"
                className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 text-center"
              >
                The Persona Engine
              </h2>
              <p className="text-gray-400 text-center font-mono text-sm sm:text-base">
                3 core analysis modules that reveal wallet identity
              </p>
            </header>

            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              {/* Heatmap Module */}
              <li>
                <article className="hover:cursor-pointer group relative p-5 sm:p-6 lg:p-8 bg-gray-950/50 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden backdrop-blur-sm rounded-lg h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="mb-3 sm:mb-4 inline-flex p-2.5 sm:p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                      <Target
                        className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      Activity Heatmap
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono mb-3 sm:mb-4">
                      GitHub-style contribution graph showing active vs. dormant
                      days
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs font-mono">
                      <li className="flex items-center gap-2">
                        <span
                          className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-cyan-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-gray-500">
                          Bot Detection: 24/7 activity patterns
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-cyan-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-gray-500">
                          Human Behavior: Weekends only
                        </span>
                      </li>
                    </ul>
                  </div>
                </article>
              </li>

              {/* Archetype Module */}
              <li>
                <article className="hover:cursor-pointer group relative p-5 sm:p-6 lg:p-8 bg-gray-950/50 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden backdrop-blur-sm rounded-lg h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="mb-3 sm:mb-4 inline-flex p-2.5 sm:p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                      <Fingerprint
                        className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                      User Archetype (Classification)
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono mb-3 sm:mb-4">
                      Heuristics engine assigning behavioral badges based on
                      data patterns
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs font-mono">
                      <li className="flex items-center gap-2 flex-wrap">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-purple-500/20 rounded text-purple-300">
                          The Grinder
                        </span>
                        <span className="text-gray-600">
                          → High Tx + Low Balance
                        </span>
                      </li>
                      <li className="flex items-center gap-2 flex-wrap">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-purple-500/20 rounded text-purple-300">
                          The Vault
                        </span>
                        <span className="text-gray-600">
                          → Zero Outgoing + High Balance
                        </span>
                      </li>
                      <li className="flex items-center gap-2 flex-wrap">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-purple-500/20 rounded text-purple-300">
                          The Trader
                        </span>
                        <span className="text-gray-600">
                          → High DEX Interaction
                        </span>
                      </li>
                    </ul>
                  </div>
                </article>
              </li>

              {/* Portfolio Module */}
              <li className="sm:col-span-2 lg:col-span-1">
                <article className="hover:cursor-pointer group relative p-5 sm:p-6 lg:p-8 bg-gray-950/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden backdrop-blur-sm rounded-lg h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="mb-3 sm:mb-4 inline-flex p-2.5 sm:p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <Zap
                        className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      Portfolio Distribution
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono mb-3 sm:mb-4">
                      Pie chart showing where their money goes
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs font-mono">
                      <li className="flex items-center gap-2">
                        <span
                          className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-blue-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-gray-500">
                          Sum of UTXO inputs vs. outputs
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-blue-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-gray-500">
                          Gas fees vs. Value transfer
                        </span>
                      </li>
                    </ul>
                  </div>
                </article>
              </li>
            </ul>
          </div>

          {/* Stats bar */}
          <aside aria-label="Platform statistics">
            <div className="p-4 sm:p-6 bg-gray-950/50 border border-gray-800 backdrop-blur-sm rounded-lg">
              <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <dt className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 font-mono">
                    Prisma ORM
                  </dt>
                  <dd className="text-xs sm:text-sm text-gray-500 mt-1">
                    Direct PostgreSQL Access
                  </dd>
                </div>
                <div className="text-center sm:text-left">
                  <dt className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-400 font-mono">
                    3 Modules
                  </dt>
                  <dd className="text-xs sm:text-sm text-gray-500 mt-1">
                    Heatmap, Archetype, Portfolio
                  </dd>
                </div>
                <div className="text-center sm:text-left">
                  <dt className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400 font-mono">
                    Zero Lag
                  </dt>
                  <dd className="text-xs sm:text-sm text-gray-500 mt-1">
                    Local Infrastructure
                  </dd>
                </div>
                <div className="text-center sm:text-left">
                  <dt className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-400 font-mono">
                    Argus Indexed
                  </dt>
                  <dd className="text-xs sm:text-sm text-gray-500 mt-1">
                    Cardano Mainnet Data
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
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
