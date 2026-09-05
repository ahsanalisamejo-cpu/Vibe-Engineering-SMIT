"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { AddCardForm } from "./AddCardForm";
import { KanbanCard } from "./Card";
import { ColumnTitle } from "./ColumnTitle";
import type { Column as ColumnType } from "@/lib/types";
import type { Card as CardType } from "@/lib/types";

type ColumnProps = {
  column: ColumnType;
  cards: CardType[];
  onAddCard: (title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
  onRenameColumn: (title: string) => void;
};

export function Column({
  column,
  cards,
  onAddCard,
  onDeleteCard,
  onRenameColumn,
}: ColumnProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <section
      data-testid={`column-${column.id}`}
      className="flex w-72 shrink-0 flex-col rounded-xl bg-gray-50/80"
    >
      <header className="border-b-2 border-[var(--accent-yellow)] px-3 py-3">
        <ColumnTitle title={column.title} onRename={onRenameColumn} />
        <p className="mt-1 text-xs text-[var(--gray-text)]">
          {cards.length} {cards.length === 1 ? "card" : "cards"}
        </p>
      </header>

      <div
        ref={setNodeRef}
        className={`flex min-h-[120px] flex-1 flex-col gap-2 p-3 transition-colors ${
          isOver ? "rounded-lg bg-[var(--blue-primary)]/5" : ""
        }`}
      >
        <SortableContext
          items={column.cardIds}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </SortableContext>

        {showAddForm ? (
          <AddCardForm
            onAdd={(title, details) => {
              onAddCard(title, details);
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <button
            type="button"
            data-testid={`add-card-btn-${column.id}`}
            className="mt-1 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-[var(--gray-text)] transition-colors hover:border-[var(--purple-secondary)] hover:text-[var(--purple-secondary)]"
            onClick={() => setShowAddForm(true)}
          >
            + Add a card
          </button>
        )}
      </div>
    </section>
  );
}
