'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, Pencil } from 'lucide-react';
import { Column, Card } from '@/types/kanban';
import { CardItem } from './CardItem';

interface ColumnContainerProps {
  column: Column;
  cards: Card[];
  onRenameColumn: (columnId: string, newTitle: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  onOpenAddCardModal: (columnId: string) => void;
}

export const ColumnContainer: React.FC<ColumnContainerProps> = ({
  column,
  cards,
  onRenameColumn,
  onDeleteCard,
  onOpenAddCardModal,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(column.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitleInput(column.title);
  }, [column.title]);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleSaveTitle = () => {
    const trimmed = titleInput.trim();
    if (trimmed && trimmed !== column.title) {
      onRenameColumn(column.id, trimmed);
    } else {
      setTitleInput(column.title);
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setTitleInput(column.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <section className="column" data-testid={`column-${column.id}`}>
      <header className="column-header">
        <div className="column-title-group">
          {isEditingTitle ? (
            <input
              ref={inputRef}
              type="text"
              className="column-title-input"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={handleKeyDown}
              aria-label="Column title"
              data-testid={`column-title-input-${column.id}`}
            />
          ) : (
            <button
              type="button"
              className="column-title-display"
              onClick={() => setIsEditingTitle(true)}
              title="Click to rename column"
              style={{ background: 'none', border: 'none', textAlign: 'left' }}
              data-testid={`column-title-btn-${column.id}`}
            >
              <h3 className="column-title">{column.title}</h3>
              <Pencil size={13} className="column-edit-icon" aria-hidden="true" />
            </button>
          )}
        </div>
        <span
          className="column-badge"
          title={`${cards.length} cards`}
          data-testid={`column-count-${column.id}`}
        >
          {cards.length}
        </span>
      </header>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`card-list ${snapshot.isDraggingOver ? 'card-list-dragging-over' : ''}`}
            data-testid={`card-list-${column.id}`}
          >
            {cards.map((card, index) => (
              <CardItem
                key={card.id}
                card={card}
                index={index}
                columnId={column.id}
                onDelete={onDeleteCard}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        type="button"
        className="add-card-trigger"
        onClick={() => onOpenAddCardModal(column.id)}
        data-testid={`add-card-btn-${column.id}`}
      >
        <Plus size={16} aria-hidden="true" />
        <span>Add Card</span>
      </button>
    </section>
  );
};
