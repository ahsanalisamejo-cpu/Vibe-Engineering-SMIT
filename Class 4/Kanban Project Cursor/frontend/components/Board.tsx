"use client";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Column } from "./Column";
import { CardOverlay } from "./Card";
import { findColumnByCardId } from "@/lib/board-actions";
import { useBoard } from "@/context/BoardContext";

export function Board() {
  const { state, dispatch } = useBoard();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function resolveDropTarget(overId: string): {
    columnId: string;
    index: number;
  } | null {
    const column = state.columns.find((col) => col.id === overId);
    if (column) {
      return { columnId: column.id, index: column.cardIds.length };
    }

    const cardColumnId = findColumnByCardId(state, overId);
    if (!cardColumnId) return null;

    const cardColumn = state.columns.find((col) => col.id === cardColumnId);
    if (!cardColumn) return null;

    const index = cardColumn.cardIds.indexOf(overId);
    return { columnId: cardColumnId, index: index >= 0 ? index : cardColumn.cardIds.length };
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveCardId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCardId(null);

    if (!over) return;

    const cardId = String(active.id);
    const fromColumnId = findColumnByCardId(state, cardId);
    if (!fromColumnId) return;

    const target = resolveDropTarget(String(over.id));
    if (!target) return;

    const fromColumn = state.columns.find((col) => col.id === fromColumnId);
    if (!fromColumn) return;

    const fromIndex = fromColumn.cardIds.indexOf(cardId);
    let toIndex = target.index;

    if (fromColumnId === target.columnId && fromIndex < toIndex) {
      toIndex -= 1;
    }

    if (fromColumnId === target.columnId && fromIndex === toIndex) return;

    dispatch({
      type: "MOVE_CARD",
      cardId,
      fromColumnId,
      toColumnId: target.columnId,
      toIndex,
    });
  }

  const activeCard = activeCardId ? state.cards[activeCardId] : null;

  return (
    <div data-testid="kanban-board" className="flex h-full flex-col">
      <header className="border-b border-gray-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="text-2xl font-bold text-[var(--navy-dark)]">
            Project Board
          </h1>
          <div className="mt-2 h-1 w-16 rounded-full bg-[var(--blue-primary)]" />
          <p className="mt-2 text-sm text-[var(--gray-text)]">
            Drag cards between columns to track progress.
          </p>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto px-6 py-6">
          <div className="mx-auto flex min-w-max gap-4">
            {state.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                cards={column.cardIds
                  .map((id) => state.cards[id])
                  .filter(Boolean)}
                onAddCard={(title, details) =>
                  dispatch({
                    type: "ADD_CARD",
                    columnId: column.id,
                    title,
                    details,
                  })
                }
                onDeleteCard={(cardId) =>
                  dispatch({ type: "DELETE_CARD", cardId })
                }
                onRenameColumn={(title) =>
                  dispatch({ type: "RENAME_COLUMN", columnId: column.id, title })
                }
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeCard ? <CardOverlay card={activeCard} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
