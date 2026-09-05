'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

interface ColumnHeaderProps {
  name: string;
  onRename: (newName: string) => void;
  columnId?: string;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ name, onRename, columnId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleConfirm = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== name) {
      onRename(trimmed);
    }
    setEditValue(name);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="mb-4">
        <label htmlFor={`column-rename-${columnId}`} className="sr-only">
          Rename column {name}
        </label>
        <input
          id={`column-rename-${columnId}`}
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleConfirm}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 bg-white border-2 border-kanban-blue rounded font-semibold text-kanban-navy focus:outline-none focus:ring-2 focus:ring-kanban-yellow"
          aria-label="Column name input"
        />
      </div>
    );
  }

  return (
    <div className="mb-4 flex items-center justify-between group">
      <h2 className="text-lg font-bold text-kanban-navy break-words flex-1">{name}</h2>
      <button
        onClick={() => setIsEditing(true)}
        className="ml-2 p-1 text-kanban-gray hover:text-kanban-blue hover:bg-gray-200 transition-all rounded opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label={`Rename column ${name}`}
        title="Click to rename"
        type="button"
      >
        <Edit2 size={16} />
      </button>
    </div>
  );
};
