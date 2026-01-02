"use client";

import { useState, useEffect } from "react";
import { Search, Brain, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AlternatingCards() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pb-8 sm:pb-10">
      {/* Grid container - both cards occupy the same cell */}
      <div className="grid">
        {/* Card 1: Behavioral Profiling */}
        <Card
          className={`col-start-1 row-start-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-cyan-950/30 via-gray-950/50 to-purple-950/30 border-cyan-500/30 backdrop-blur-sm overflow-hidden transition-all duration-1000 ${
            activeCard === 0
              ? "opacity-100 scale-100 translate-x-0"
              : "opacity-0 scale-95 -translate-x-8 pointer-events-none"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-cyan-500/20 rounded-lg">
                <Brain className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-cyan-300" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                  Behavioral Profiling for Cardano
                </h2>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                  The forensic tool that answers the real question
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 my-4 sm:my-6 lg:my-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 sm:mt-1 p-1 sm:p-1.5 bg-red-500/20 rounded shrink-0">
                    <div className="h-2 w-2 sm:h-3 sm:w-3 bg-red-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-0.5 sm:mb-1">
                      Traditional Explorers
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-mono">
                      Show transaction hashes, blocks, and raw data
                    </p>
                    <p className="text-red-400 text-xs sm:text-sm mt-1">
                      Question: "What transactions happened?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 sm:mt-1 p-1 sm:p-1.5 bg-cyan-500/20 rounded shrink-0">
                    <div className="h-2 w-2 sm:h-3 sm:w-3 bg-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-0.5 sm:mb-1">
                      Argus Identity
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-mono">
                      Generates visual personas with behavioral badges
                    </p>
                    <p className="text-cyan-400 text-xs sm:text-sm mt-1">
                      Question: "Who is this user?"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-gray-700">
              <p className="text-gray-300 text-center mb-4 sm:mb-6 font-mono text-xs sm:text-sm lg:text-base">
                Transform complex SQL queries into simple, human-readable
                insights
              </p>
              <div className="flex justify-center">
                <Link href="/">
                  <Button className="hover:cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-black font-mono font-bold text-sm sm:text-base lg:text-lg py-4 sm:py-5 lg:py-6 px-4 sm:px-6">
                    <Search className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Start Profiling Wallets
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 2: Ready to Investigate */}
        <Card
          className={`col-start-1 row-start-1 p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border-cyan-500/30 overflow-hidden backdrop-blur-sm transition-all duration-1000 flex flex-col ${
            activeCard === 1
              ? "opacity-100 scale-100 translate-x-0"
              : "opacity-0 scale-95 translate-x-8 pointer-events-none"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative text-center flex flex-col items-center justify-center flex-1">
            <div className="inline-flex p-3 sm:p-4 bg-cyan-500/20 rounded-full mb-4 sm:mb-6">
              <User className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-cyan-300" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-white">
              Ready to Investigate?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto font-mono px-2">
              Enter any Cardano wallet address and watch as Argus Identity
              generates a complete behavioral profile in seconds
            </p>
            <Link href="/">
              <Button className="hover:cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-black font-mono font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6">
                <Search className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden xs:inline">
                  Launch Investigation Terminal
                </span>
                <span className="xs:hidden">Launch Terminal</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Navigation dots */}
      <nav
        aria-label="Card navigation"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-10"
      >
        <button
          onClick={() => setActiveCard(0)}
          className={`hover:cursor-pointer h-2 rounded-full transition-all ${
            activeCard === 0
              ? "w-6 sm:w-8 bg-cyan-400"
              : "w-2 bg-gray-600 hover:bg-gray-500"
          }`}
          aria-label="Show behavioral profiling card"
          aria-current={activeCard === 0 ? "true" : undefined}
        />
        <button
          onClick={() => setActiveCard(1)}
          className={`hover:cursor-pointer h-2 rounded-full transition-all ${
            activeCard === 1
              ? "w-6 sm:w-8 bg-cyan-400"
              : "w-2 bg-gray-600 hover:bg-gray-500"
          }`}
          aria-label="Show investigation card"
          aria-current={activeCard === 1 ? "true" : undefined}
        />
      </nav>
    </section>
  );
}
