'use client';

import React from 'react';
import { KanbanSquare, Columns3, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  totalColumns: number;
  totalCards: number;
}

export const Navbar: React.FC<NavbarProps> = ({ totalColumns, totalCards }) => {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-brand">
        <div className="brand-icon" aria-hidden="true">
          <KanbanSquare size={20} />
        </div>
        <div>
          <span className="brand-title">Kanban Flow</span>
          <span className="brand-subtitle">Project Management</span>
        </div>
      </div>
      <div className="navbar-stats">
        <div className="stat-chip" title="Total Columns">
          <Columns3 size={14} color="#209dd7" aria-hidden="true" />
          <span><strong>{totalColumns}</strong> Columns</span>
        </div>
        <div className="stat-chip" title="Total Tasks">
          <CheckCircle2 size={14} color="#ecad0a" aria-hidden="true" />
          <span><strong>{totalCards}</strong> Tasks</span>
        </div>
      </div>
    </header>
  );
};
