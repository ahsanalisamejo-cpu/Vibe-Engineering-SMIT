'use client';

import React, { useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  DragCancelEvent,
} from '@dnd-kit/core';
import { Board as BoardType } from '@/types';
import { Column } from './Column';
import { Card as CardComponent } from './Card';
import { initialBoard } from '@/app/data/initialBoard';
import { generateId } from '@/utils/idGenerator';

export const Board: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleRenameColumn = useCallback(
    (columnId: string, newName: string) => {
      setBoard((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            name: newName,
          },
        },
      }));
    },
    []
  );

  const handleDeleteCard = useCallback((cardId: string) => {
    setBoard((prev) => {
      const newColumns = { ...prev.columns };

      // Find and remove card from column
      Object.keys(newColumns).forEach((colId) => {
        newColumns[colId] = {
          ...newColumns[colId],
          cardIds: newColumns[colId].cardIds.filter((id) => id !== cardId),
        };
      });

      // Remove card from cards map
      const newCards = { ...prev.cards };
      delete newCards[cardId];

      return {
        ...prev,
        columns: newColumns,
        cards: newCards,
      };
    });
  }, []);

  const handleAddCard = useCallback(
    (columnId: string, title: string, details: string) => {
      const newCardId = generateId();

      setBoard((prev) => ({
        ...prev,
        cards: {
          ...prev.cards,
          [newCardId]: {
            id: newCardId,
            title,
            details,
          },
        },
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            cardIds: [...prev.columns[columnId].cardIds, newCardId],
          },
        },
      }));
    },
    []
  );

  const handleDragStart = (event: DragStartEvent) => {
    const cardId = event.active.id as string;
    setActiveCardId(cardId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCardId(null);

    if (!over) return;

    const sourceCardId = active.id as string;
    const targetId = over.id as string;

    // Handle card reordering within column or moving to another column
    setBoard((prev) => {
      const newColumns = { ...prev.columns };
      let sourceColumnId: string | null = null;
      let targetColumnId: string | null = null;

      // Find source column
      Object.entries(newColumns).forEach(([colId, col]) => {
        if (col.cardIds.includes(sourceCardId)) {
          sourceColumnId = colId;
        }
      });

      // Determine if we're dropping on a card or column
      // If target is a card, find its column
      Object.entries(newColumns).forEach(([colId, col]) => {
        if (col.cardIds.includes(targetId)) {
          targetColumnId = colId;
        }
      });

      // If we're dropping on a column directly (empty column), use that column
      if (targetId in newColumns) {
        targetColumnId = targetId;
      }

      if (!sourceColumnId || !targetColumnId) return prev;

      // Remove from source column
      const sourceCol = newColumns[sourceColumnId];
      const cardIndex = sourceCol.cardIds.indexOf(sourceCardId);
      sourceCol.cardIds.splice(cardIndex, 1);

      // Add to target column
      const targetCol = newColumns[targetColumnId];

      if (sourceColumnId === targetColumnId) {
        // Reordering within same column
        const targetCardIndex = targetCol.cardIds.indexOf(targetId);
        if (targetCardIndex !== -1) {
          targetCol.cardIds.splice(cardIndex, 1);
          targetCol.cardIds.splice(targetCardIndex, 0, sourceCardId);
        } else {
          // Target was the column itself, add to end
          targetCol.cardIds.push(sourceCardId);
        }
      } else {
        // Moving to different column
        targetCol.cardIds.push(sourceCardId);
      }

      return {
        ...prev,
        columns: newColumns,
      };
    });
  };

  const handleDragCancel = () => {
    setActiveCardId(null);
  };

  const columnIds = Object.keys(board.columns);
  const activeCard = activeCardId ? board.cards[activeCardId] : null;
  const totalCards = Object.keys(board.cards).length;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="w-full h-full bg-gradient-to-br from-kanban-navy to-kanban-purple p-6 overflow-x-auto">
        <div className="min-h-screen">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Kanban Board</h1>
            <p className="text-gray-300 text-sm">
              {columnIds.length} columns, {totalCards} card{totalCards !== 1 ? 's' : ''}
            </p>
          </header>

          <main className="flex gap-6 pb-6" role="main">
            {columnIds.map((columnId) => (
              <Column
                key={columnId}
                column={board.columns[columnId]}
                cards={board.cards}
                onRename={(newName) => handleRenameColumn(columnId, newName)}
                onDeleteCard={handleDeleteCard}
                onAddCard={(title, details) =>
                  handleAddCard(columnId, title, details)
                }
              />
            ))}
          </main>
        </div>
      </div>

      <DragOverlay>
        {activeCard ? (
          <CardComponent card={activeCard} onDelete={() => {}} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
