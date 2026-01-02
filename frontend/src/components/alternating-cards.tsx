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
    <div className="relative h-[500px] md:h-[400px]">
      {/* Card 1: Behavioral Profiling */}
      <Card
        className={`absolute inset-0 p-8 bg-gradient-to-br from-cyan-950/30 via-gray-950/50 to-purple-950/30 border-cyan-500/30 backdrop-blur-sm overflow-hidden transition-all duration-1000 ${
          activeCard === 0
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-95 -translate-x-8 pointer-events-none"
        }`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative h-full flex flex-col">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <Brain className="h-8 w-8 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Behavioral Profiling for Cardano
              </h2>
              <p className="text-gray-400 text-lg">
                The forensic tool that answers the real question
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-red-500/20 rounded">
                  <div className="h-3 w-3 bg-red-400" />
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

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-cyan-500/20 rounded">
                  <div className="h-3 w-3 bg-cyan-400" />
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

          <div className="pt-6 border-t border-gray-700">
            <p className="text-gray-300 text-center mb-6 font-mono">
              Transform complex SQL queries into simple, human-readable insights
            </p>
            <div className="flex justify-center">
              <Link href="/">
                <Button className="hover:cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-black font-mono font-bold text-lg py-6">
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
        className={`absolute inset-0 p-12 bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border-cyan-500/30 overflow-hidden backdrop-blur-sm transition-all duration-1000 ${
          activeCard === 1
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-95 translate-x-8 pointer-events-none"
        }`}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

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
          <Link href="/">
            <Button className="hover:cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-black font-mono font-bold text-lg px-10 py-6">
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
          className={`hover:cursor-pointer h-2 rounded-full transition-all ${
            activeCard === 0
              ? "w-8 bg-cyan-400"
              : "w-2 bg-gray-600 hover:bg-gray-500"
          }`}
          aria-label="Show behavioral profiling card"
        />
        <button
          onClick={() => setActiveCard(1)}
          className={`hover:cursor-pointer h-2 rounded-full transition-all ${
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
