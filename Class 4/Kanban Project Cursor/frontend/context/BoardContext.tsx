"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import { boardReducer } from "@/lib/board-actions";
import { initialBoardState } from "@/lib/dummy-data";
import type { BoardAction, BoardState } from "@/lib/types";

type BoardContextValue = {
  state: BoardState;
  dispatch: (action: BoardAction) => void;
};

const BoardContext = createContext<BoardContextValue | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within BoardProvider");
  }
  return context;
}
