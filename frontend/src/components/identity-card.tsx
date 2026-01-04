"use client";

import type { WalletPersona } from "@/app/actions";
import {
  Wallet,
  Activity,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

interface IdentityCardProps {
  persona: WalletPersona;
}

export default function IdentityCard({ persona }: IdentityCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "UNKNOWN";
    return new Date(date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toUpperCase();
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-xl opacity-20 group-hover:opacity-30 blur transition duration-300" />
      <div className="relative bg-black border border-gray-800 rounded-xl p-6 md:p-8 backdrop-blur-sm overflow-hidden">
        {/* Scan lines effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

        {/* Header */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-500/20 p-2.5 rounded-lg border border-cyan-500/30">
                <Wallet className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 font-mono uppercase tracking-wider">
                  Identity Profile
                </h2>
                <p className="text-xs text-gray-600 font-mono mt-0.5">
                  {"> Classification Complete"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-400 font-bold">
                VERIFIED
              </span>
            </div>
          </div>
          <div className="p-3 bg-gray-950 border border-gray-800 rounded-lg">
            <p className="text-gray-500 font-mono text-xs break-all">
              {persona.address}
            </p>
          </div>
        </div>

        <div className="relative mb-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 font-mono flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Threat Classification
          </h3>
          <div className="flex flex-wrap gap-2">
            {persona.badges.map((badge, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 rounded-full text-sm font-bold text-purple-300 font-mono uppercase tracking-wide shadow-lg shadow-purple-500/20"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Balance */}
          <div className="bg-gradient-to-br from-emerald-950/30 to-gray-950/30 rounded-lg p-4 border border-emerald-500/30 group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wide font-mono">
                Balance
              </p>
            </div>
            <p className="text-3xl font-bold text-emerald-400 font-mono">
              {persona.balance.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-emerald-500/60 text-xs font-mono mt-1">ADA</p>
          </div>

          {/* Transaction Count */}
          <div className="bg-gradient-to-br from-cyan-950/30 to-gray-950/30 rounded-lg p-4 border border-cyan-500/30 group hover:border-cyan-500/50 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wide font-mono">
                Transactions
              </p>
            </div>
            <p className="text-3xl font-bold text-cyan-400 font-mono">
              {persona.txCount.toLocaleString()}
            </p>
            <p className="text-cyan-500/60 text-xs font-mono mt-1">TOTAL</p>
          </div>

          {/* Activity Period */}
          <div className="bg-gradient-to-br from-purple-950/30 to-gray-950/30 rounded-lg p-4 border border-purple-500/30 group hover:border-purple-500/50 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wide font-mono">
                Timeline
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-purple-400/60" />
                <p className="text-xs text-purple-400 font-mono">
                  FIRST: {formatDate(persona.firstActive)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-purple-400/60" />
                <p className="text-xs text-purple-400 font-mono">
                  LAST: {formatDate(persona.lastActive)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
