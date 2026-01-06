"use server";

import { PrismaClient } from "../../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

export type WalletPersona = {
  address: string;
  balance: number;
  txCount: number;
  firstActive: Date | null;
  lastActive: Date | null;
  badges: string[];
  distribution: { name: string; value: number }[];
};

export async function getWalletIdentity(
  address: string
): Promise<WalletPersona> {
  // 1. Fetch UTXOs
  const utxos = await prisma.walletUtxos.findMany({
    where: {
      Address: address,
    },
  });

  // 2. Fetch the related Transaction details
  const txHashes = utxos.map((u) => u.TxHash);

  const transactions = await prisma.walletTransactions.findMany({
    where: {
      TxHash: { in: txHashes },
    },
    orderBy: {
      Timestamp: "desc",
    },
  });

  // 3. Perform Analysis

  // A. Balance Calculation (Sum of UTXOs)
  const balanceLovelace = utxos.reduce(
    (acc, utxo) => acc + BigInt(utxo.LovelaceAmount.toString()),
    BigInt(0)
  );
  const balance = Number(balanceLovelace) / 1_000_000;

  // B. Activity Timing
  const txCount = transactions.length;
  const lastActive = transactions.length > 0 ? transactions[0].Timestamp : null;
  const firstActive =
    transactions.length > 0
      ? transactions[transactions.length - 1].Timestamp
      : null;

  // C. Badges Engine
  const badges: string[] = [];

  if (balance > 10_000) badges.push("Whale 🐳");
  else if (balance > 1_000) badges.push("Shark 🦈");
  else if (balance === 0) badges.push("Paper Hands 🧻");
  else badges.push("Fish 🐟");

  if (txCount > 50) badges.push("The Grinder ⚔️");
  if (transactions.some((t) => t.IsSmartContractInteraction))
    badges.push("DeFi User 🦄");

  if (
    firstActive &&
    new Date().getFullYear() - firstActive.getFullYear() >= 1
  ) {
    badges.push("Diamond Hands 💎");
  }

  // D. Portfolio Distribution
  let smallTxs = 0; // < 10 ADA
  let mediumTxs = 0; // 10 - 100 ADA
  let largeTxs = 0; // > 100 ADA

  utxos.forEach((u) => {
    const ada = Number(u.LovelaceAmount.toString()) / 1_000_000;
    if (ada < 10) smallTxs++;
    else if (ada < 100) mediumTxs++;
    else largeTxs++;
  });

  const distribution = [
    { name: "Micro (<10 ₳)", value: smallTxs },
    { name: "Standard (10-100 ₳)", value: mediumTxs },
    { name: "Whale (>100 ₳)", value: largeTxs },
  ].filter((d) => d.value > 0);

  return {
    address,
    balance,
    txCount,
    firstActive,
    lastActive,
    badges,
    distribution,
  };
}

export async function getActivityHeatmap(address: string) {
  // 1. Get TxHashes for this address
  const utxos = await prisma.walletUtxos.findMany({
    where: { Address: address },
    select: { TxHash: true },
  });
  const hashes = utxos.map((u) => u.TxHash);

  // 2. Get Timestamps
  const txs = await prisma.walletTransactions.findMany({
    where: { TxHash: { in: hashes } },
    select: { Timestamp: true },
  });

  // 3. Format for React-Activity-Calendar
  const activityMap = new Map<string, number>();

  txs.forEach((tx) => {
    // Format YYYY-MM-DD
    const date = tx.Timestamp.toISOString().split("T")[0];
    activityMap.set(date, (activityMap.get(date) || 0) + 1);
  });

  return Array.from(activityMap.entries()).map(([date, count]) => ({
    date,
    count,
    level: Math.min(4, Math.ceil(count / 2)),
  }));
}

export async function getRecentAddresses() {
  // Fetch the 5 most recent unique addresses that received funds
  const recentUtxos = await prisma.walletUtxos.findMany({
    take: 5,
    orderBy: {
      TxHash: "desc",
    },
    distinct: ["Address"],
    select: {
      Address: true,
      LovelaceAmount: true,
    },
  });

  return recentUtxos.map((u) => ({
    address: u.Address,
    lastAmount: Number(u.LovelaceAmount) / 1_000_000,
  }));
}
