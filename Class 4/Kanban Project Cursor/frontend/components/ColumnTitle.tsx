"use client";

import { useEffect, useRef, useState } from "react";

type ColumnTitleProps = {
  title: string;
  onRename: (title: string) => void;
};

export function ColumnTitle({ title, onRename }: ColumnTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(title);
  }, [title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function save() {
    const trimmed = value.trim();
    if (trimmed) {
      onRename(trimmed);
      setValue(trimmed);
    } else {
      setValue(title);
    }
    setIsEditing(false);
  }

  function cancel() {
    setValue(title);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        data-testid="column-title-input"
        className="w-full rounded border border-[var(--blue-primary)] bg-white px-2 py-1 text-base font-semibold text-[var(--navy-dark)] outline-none focus:ring-2 focus:ring-[var(--blue-primary)]/30"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") cancel();
        }}
      />
    );
  }

  return (
    <button
      type="button"
      data-testid="column-title"
      className="w-full text-left text-base font-semibold text-[var(--navy-dark)] transition-colors hover:text-[var(--blue-primary)]"
      onClick={() => setIsEditing(true)}
      title="Click to rename column"
    >
      {title}
    </button>
  );
}
