"use client";

import { useState } from "react";

type AddCardFormProps = {
  onAdd: (title: string, details: string) => void;
  onCancel: () => void;
};

export function AddCardForm({ onAdd, onCancel }: AddCardFormProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, details);
    setTitle("");
    setDetails("");
  }

  return (
    <form
      data-testid="add-card-form"
      className="mt-2 space-y-2 rounded-lg border border-[var(--accent-yellow)]/40 bg-white p-3 shadow-sm"
      onSubmit={handleSubmit}
    >
      <input
        data-testid="add-card-title"
        className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm text-[var(--navy-dark)] outline-none focus:border-[var(--blue-primary)] focus:ring-2 focus:ring-[var(--blue-primary)]/20"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        data-testid="add-card-details"
        className="w-full resize-none rounded border border-gray-200 px-2 py-1.5 text-sm text-[var(--gray-text)] outline-none focus:border-[var(--blue-primary)] focus:ring-2 focus:ring-[var(--blue-primary)]/20"
        placeholder="Details (optional)"
        rows={2}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          data-testid="add-card-submit"
          className="rounded-md bg-[var(--purple-secondary)] px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Add card
        </button>
        <button
          type="button"
          data-testid="add-card-cancel"
          className="rounded-md px-3 py-1.5 text-sm text-[var(--gray-text)] transition-colors hover:text-[var(--navy-dark)]"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
