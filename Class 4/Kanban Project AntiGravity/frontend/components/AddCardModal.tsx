'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface AddCardModalProps {
  isOpen: boolean;
  columnTitle: string;
  onClose: () => void;
  onSubmit: (title: string, details: string) => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  columnTitle,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDetails('');
      setError('');
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Card title is required');
      return;
    }
    onSubmit(trimmedTitle, details.trim());
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      data-testid="add-card-modal"
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3 id="modal-heading" className="modal-title">
            Add Card to {columnTitle}
          </h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            data-testid="modal-close-btn"
          >
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="card-title-input" className="form-label">
              Title *
            </label>
            <input
              id="card-title-input"
              ref={titleInputRef}
              type="text"
              className="form-input"
              placeholder="e.g. Implement authentication flows"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              data-testid="card-title-input"
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="card-details-input" className="form-label">
              Details
            </label>
            <textarea
              id="card-details-input"
              className="form-textarea"
              placeholder="Add description, notes, or acceptance criteria..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              data-testid="card-details-input"
            />
          </div>

          <footer className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              data-testid="modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              data-testid="modal-submit-btn"
            >
              Create Card
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
