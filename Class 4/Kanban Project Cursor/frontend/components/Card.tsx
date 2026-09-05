"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/lib/types";

type KanbanCardProps = {
  card: CardType;
  onDelete: (cardId: string) => void;
};

export function KanbanCard({ card, onDelete }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-testid={`card-${card.id}`}
      className={`group rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:border-[var(--accent-yellow)] hover:shadow-md ${
        isDragging ? "opacity-40" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-[var(--navy-dark)]">
          {card.title}
        </h3>
        <button
          type="button"
          data-testid={`delete-card-${card.id}`}
          className="shrink-0 rounded px-1.5 py-0.5 text-xs text-[var(--gray-text)] opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(card.id)}
          aria-label={`Delete ${card.title}`}
        >
          Delete
        </button>
      </div>
      {card.details ? (
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--gray-text)]">
          {card.details}
        </p>
      ) : null}
    </div>
  );
}

type CardOverlayProps = {
  card: CardType;
};

export function CardOverlay({ card }: CardOverlayProps) {
  return (
    <div className="rotate-1 rounded-lg border-2 border-[var(--accent-yellow)] bg-white p-3 shadow-xl">
      <h3 className="text-sm font-semibold text-[var(--navy-dark)]">
        {card.title}
      </h3>
      {card.details ? (
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--gray-text)]">
          {card.details}
        </p>
      ) : null}
    </div>
  );
}
