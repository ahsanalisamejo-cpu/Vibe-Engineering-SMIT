'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card as CardType, Column as ColumnType } from '@/types';
import { Card } from './Card';
import { ColumnHeader } from './ColumnHeader';
import { AddCardForm } from './AddCardForm';

interface ColumnProps {
  column: ColumnType;
  cards: Record<string, CardType>;
  onRename: (newName: string) => void;
  onDeleteCard: (cardId: string) => void;
  onAddCard: (title: string, details: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  cards,
  onRename,
  onDeleteCard,
  onAddCard,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const columnCards = column.cardIds.map((cardId) => cards[cardId]).filter(Boolean);
  const cardCount = columnCards.length;

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4 shadow-sm border-2 transition-all min-h-96 ${
        isOver
          ? 'border-kanban-yellow bg-yellow-50 ring-2 ring-kanban-yellow'
          : 'border-gray-200'
      }`}
      role="region"
      aria-label={`${column.name} column with ${cardCount} card${cardCount !== 1 ? 's' : ''}`}
    >
      <ColumnHeader 
        name={column.name} 
        onRename={onRename}
        columnId={column.id}
      />

      <SortableContext
        items={column.cardIds}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-0" role="list">
          {columnCards.length === 0 ? (
            <div className="text-center py-8 text-kanban-gray text-sm" role="status">
              No cards yet
            </div>
          ) : (
            columnCards.map((card) => (
              <div key={card.id} role="listitem">
                <Card
                  card={card}
                  onDelete={onDeleteCard}
                />
              </div>
            ))
          )}
        </div>
      </SortableContext>

      <AddCardForm onAdd={onAddCard} />
    </div>
  );
};
