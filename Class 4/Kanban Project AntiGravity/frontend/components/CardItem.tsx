'use client';

import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2 } from 'lucide-react';
import { Card } from '@/types/kanban';

interface CardItemProps {
  card: Card;
  index: number;
  columnId: string;
  onDelete: (columnId: string, cardId: string) => void;
}

export const CardItem: React.FC<CardItemProps> = ({
  card,
  index,
  columnId,
  onDelete,
}) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`kanban-card ${snapshot.isDragging ? 'is-dragging' : ''}`}
          data-testid={`card-${card.id}`}
        >
          <div className="card-top-row">
            <div className="card-accent-pill" />
            <button
              type="button"
              className="card-delete-btn"
              title="Delete card"
              aria-label={`Delete ${card.title}`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(columnId, card.id);
              }}
              data-testid={`delete-card-${card.id}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
          <h4 className="card-title">{card.title}</h4>
          {card.details && <p className="card-details">{card.details}</p>}
        </div>
      )}
    </Draggable>
  );
};
