"use client";

import { Board } from "@/components/Board";
import { BoardProvider } from "@/context/BoardContext";

export default function Home() {
  return (
    <BoardProvider>
      <main className="min-h-screen">
        <Board />
      </main>
    </BoardProvider>
  );
}
