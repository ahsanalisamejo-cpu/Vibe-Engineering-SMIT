'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface AddCardFormProps {
  onAdd: (title: string, details: string) => void;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      titleRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    const trimmedDetails = details.trim();

    if (!trimmedTitle) {
      setError('Card title cannot be empty');
      titleRef.current?.focus();
      return;
    }

    onAdd(trimmedTitle, trimmedDetails);
    setTitle('');
    setDetails('');
    setError('');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDetails('');
    setError('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-3 py-2 px-4 bg-kanban-purple text-white rounded-lg font-medium hover:bg-opacity-90 active:bg-opacity-80 transition-all flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kanban-purple"
        aria-label="Add a new card"
        type="button"
      >
        <Plus size={16} />
        Add Card
      </button>
    );
  }

  return (
    <div className="mt-3 bg-white rounded-lg shadow-md p-4 border-2 border-kanban-yellow focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-kanban-yellow">
      <label htmlFor="card-title" className="sr-only">
        Card title
      </label>
      <input
        id="card-title"
        ref={titleRef}
        type="text"
        placeholder="Card title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError('');
        }}
        className="w-full px-3 py-2 mb-2 border border-kanban-gray rounded text-sm focus:outline-none focus:border-kanban-blue focus:ring-1 focus:ring-kanban-blue"
        aria-label="Card title"
        aria-describedby={error ? 'error-message' : undefined}
      />
      
      {error && (
        <p id="error-message" className="text-xs text-red-600 mb-2">
          {error}
        </p>
      )}
      
      <label htmlFor="card-details" className="sr-only">
        Card details (optional)
      </label>
      <textarea
        id="card-details"
        placeholder="Card details (optional)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2 mb-3 border border-kanban-gray rounded text-sm resize-none focus:outline-none focus:border-kanban-blue focus:ring-1 focus:ring-kanban-blue"
        rows={2}
        aria-label="Card details"
      />
      
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 py-2 px-3 bg-kanban-blue text-white rounded font-medium hover:bg-opacity-90 active:bg-opacity-80 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kanban-blue"
          type="button"
        >
          Add
        </button>
        <button
          onClick={handleCancel}
          className="py-2 px-3 bg-kanban-gray text-white rounded font-medium hover:bg-opacity-90 active:bg-opacity-80 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kanban-gray"
          type="button"
          aria-label="Cancel adding card"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
