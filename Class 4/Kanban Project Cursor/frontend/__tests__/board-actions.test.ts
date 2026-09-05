import { describe, expect, it } from "vitest";
import {
  addCard,
  deleteCard,
  findColumnByCardId,
  moveCard,
  renameColumn,
} from "@/lib/board-actions";
import { initialBoardState } from "@/lib/dummy-data";

describe("board-actions", () => {
  describe("addCard", () => {
    it("appends a card to the correct column", () => {
      const result = addCard(
        initialBoardState,
        "col-backlog",
        "New task",
        "Some details",
      );

      const column = result.columns.find((c) => c.id === "col-backlog");
      const newId = column!.cardIds[column!.cardIds.length - 1];

      expect(column!.cardIds).toHaveLength(4);
      expect(result.cards[newId]).toEqual({
        id: newId,
        title: "New task",
        details: "Some details",
      });
    });

    it("ignores empty titles", () => {
      const result = addCard(initialBoardState, "col-backlog", "  ", "details");
      expect(result).toEqual(initialBoardState);
    });
  });

  describe("deleteCard", () => {
    it("removes card from column and cards map", () => {
      const result = deleteCard(initialBoardState, "c1");

      expect(result.cards.c1).toBeUndefined();
      expect(
        result.columns.find((c) => c.id === "col-backlog")!.cardIds,
      ).not.toContain("c1");
    });

    it("returns unchanged state for unknown card", () => {
      const result = deleteCard(initialBoardState, "unknown");
      expect(result).toEqual(initialBoardState);
    });
  });

  describe("renameColumn", () => {
    it("updates column title only", () => {
      const result = renameColumn(initialBoardState, "col-done", "Shipped");

      expect(result.columns.find((c) => c.id === "col-done")!.title).toBe(
        "Shipped",
      );
      expect(result.cards).toEqual(initialBoardState.cards);
    });

    it("ignores empty titles", () => {
      const result = renameColumn(initialBoardState, "col-done", "   ");
      expect(result).toEqual(initialBoardState);
    });
  });

  describe("moveCard", () => {
    it("moves a card to another column", () => {
      const result = moveCard(
        initialBoardState,
        "c1",
        "col-backlog",
        "col-done",
        0,
      );

      expect(
        result.columns.find((c) => c.id === "col-backlog")!.cardIds,
      ).not.toContain("c1");
      expect(
        result.columns.find((c) => c.id === "col-done")!.cardIds[0],
      ).toBe("c1");
    });

    it("reorders within the same column", () => {
      const result = moveCard(
        initialBoardState,
        "c1",
        "col-backlog",
        "col-backlog",
        2,
      );

      const ids = result.columns.find((c) => c.id === "col-backlog")!.cardIds;
      expect(ids).toEqual(["c2", "c3", "c1"]);
    });

    it("returns unchanged state when card is not in source column", () => {
      const result = moveCard(
        initialBoardState,
        "c1",
        "col-done",
        "col-backlog",
        0,
      );
      expect(result).toEqual(initialBoardState);
    });
  });

  describe("findColumnByCardId", () => {
    it("finds the column containing a card", () => {
      expect(findColumnByCardId(initialBoardState, "c6")).toBe("col-in-progress");
    });

    it("returns undefined for unknown card", () => {
      expect(findColumnByCardId(initialBoardState, "missing")).toBeUndefined();
    });
  });
});
