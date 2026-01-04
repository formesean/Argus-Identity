"use client";

import { useState, useEffect } from "react";
import { Search, Brain, User, ShieldAlert, Cpu, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AlternatingCards() {
  const [activeCard, setActiveCard] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    const glitchInterval = setInterval(() => {
      setTick((t) => t + 1);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative mb-16 h-[600px] md:h-[500px]">
      <div className="absolute -inset-4 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-500 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-purple-500 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-purple-500 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-500 rounded-br-3xl" />
      </div>

      {/* Card 1: Behavioral Profiling */}
      <Card
        className={`absolute inset-0 p-8 md:p-12 bg-gradient-to-br from-cyan-950/30 via-gray-950/60 to-purple-950/30 border-cyan-500/30 backdrop-blur-md overflow-hidden transition-all duration-1000 ${
          activeCard === 0
            ? "opacity-100 scale-100 translate-x-0 rotate-0"
            : "opacity-0 scale-95 -translate-x-12 -rotate-1 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #06b6d4 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative h-full flex flex-col">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative p-3 bg-cyan-500/20 rounded-lg group">
              <div className="absolute -inset-1 bg-cyan-500/40 blur opacity-0 group-hover:opacity-100 transition-opacity" />
              <Brain className="relative h-8 w-8 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="h-4 w-4 text-cyan-500/50" />
                <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-[0.2em]">
                  System.Analysis.v2
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Behavioral Profiling
              </h2>
              <p className="text-gray-400 text-lg">
                The forensic tool that answers the real question
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4 group hover:cursor-pointer">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-transparent hover:border-red-500/20 hover:bg-red-500/5 transition-all">
                <div className="mt-1 p-1.5 bg-red-500/20 rounded">
                  <ShieldAlert className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Traditional Explorers
                  </h3>
                  <p className="text-gray-400 text-sm font-mono">
                    Show transaction hashes, blocks, and raw data
                  </p>
                  <p className="text-red-400 text-sm mt-1">
                    Question: "What transactions happened?"
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 group hover:cursor-pointer">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-transparent hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all">
                <div className="mt-1 p-1.5 bg-cyan-500/20 rounded">
                  <Target className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Argus Identity
                  </h3>
                  <p className="text-gray-400 text-sm font-mono">
                    Generates visual personas with behavioral badges
                  </p>
                  <p className="text-cyan-400 text-sm mt-1">
                    Question: "Who is this user?"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-700">
            <p className="text-gray-300 text-center mb-6 font-mono">
              Transform complex SQL queries into simple, human-readable insights
            </p>
            <div className="flex justify-center">
              <Link href="/investigate">
                <Button className="hover:cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-black font-mono font-bold text-lg px-8 py-6">
                  <Search className="mr-2 h-5 w-5" />
                  Start Profiling Wallets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* Card 2: Ready to Investigate */}
      <Card
        className={`absolute inset-0 p-12 bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border-cyan-500/30 overflow-hidden backdrop-blur-md transition-all duration-1000 ${
          activeCard === 1
            ? "opacity-100 scale-100 translate-x-0 rotate-0"
            : "opacity-0 scale-95 translate-x-12 rotate-1 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </div>

        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative text-center h-full flex flex-col items-center justify-center">
          <div className="inline-flex p-4 bg-cyan-500/20 rounded-full mb-6">
            <User className="h-8 w-8 text-cyan-300" />
          </div>
          <h3 className="text-3xl font-bold mb-3 text-white">
            Ready to Investigate?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto font-mono">
            Enter any Cardano wallet address and watch as Argus Identity
            generates a complete behavioral profile in seconds
          </p>
          <Link href="/investigate">
            <Button className="hover:cursor-pointerbg-cyan-500 hover:bg-cyan-600 text-black font-mono font-bold text-lg px-10 py-6">
              <Search className="mr-2 h-5 w-5" />
              Launch Investigation Terminal
            </Button>
          </Link>
        </div>
      </Card>

      {/* Navigation dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <button
          onClick={() => setActiveCard(0)}
          className={`h-2 rounded-full transition-all ${
            activeCard === 0
              ? "w-8 bg-cyan-400"
              : "w-2 bg-gray-600 hover:bg-gray-500"
          }`}
          aria-label="Show behavioral profiling card"
        />
        <button
          onClick={() => setActiveCard(1)}
          className={`h-2 rounded-full transition-all ${
            activeCard === 1
              ? "w-8 bg-cyan-400"
              : "w-2 bg-gray-600 hover:bg-gray-500"
          }`}
          aria-label="Show investigation card"
        />
      </div>
    </div>
  );
}
