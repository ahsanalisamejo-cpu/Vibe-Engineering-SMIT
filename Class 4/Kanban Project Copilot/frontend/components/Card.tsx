'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { Card as CardType } from '@/types';

interface CardProps {
  card: CardType;
  onDelete: (cardId: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    if (confirm(`Delete card "${card.title}"?`)) {
      onDelete(card.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 border-kanban-blue hover:shadow-lg transition-all cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'opacity-50 scale-95 shadow-lg ring-2 ring-kanban-yellow'
          : 'opacity-100 scale-100'
      }`}
      role="article"
      aria-label={`Card: ${card.title}`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-kanban-navy mb-1 text-sm break-words">
            {card.title}
          </h3>
          {card.details && (
            <p className="text-xs text-kanban-gray break-words">{card.details}</p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="text-kanban-gray hover:text-red-500 transition-colors flex-shrink-0 p-1 hover:bg-red-50 rounded"
          aria-label={`Delete card ${card.title}`}
          title="Delete card"
          type="button"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
