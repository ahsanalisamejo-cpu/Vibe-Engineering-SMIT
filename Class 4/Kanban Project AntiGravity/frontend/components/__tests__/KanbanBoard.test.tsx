import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { KanbanBoard } from '../KanbanBoard';

describe('KanbanBoard Component', () => {
  it('renders all 5 initial columns', () => {
    render(<KanbanBoard />);
    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('renders header stats correctly', () => {
    render(<KanbanBoard />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('allows clicking column title to edit and renaming with Enter', () => {
    render(<KanbanBoard />);
    const backlogBtn = screen.getByTestId('column-title-btn-col-backlog');
    fireEvent.click(backlogBtn);

    const input = screen.getByTestId('column-title-input-col-backlog');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Product Ideas' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Product Ideas')).toBeInTheDocument();
  });

  it('opens add card modal and creates a new card', () => {
    render(<KanbanBoard />);
    const addCardBtn = screen.getByTestId('add-card-btn-col-todo');
    fireEvent.click(addCardBtn);

    expect(screen.getByTestId('add-card-modal')).toBeInTheDocument();

    const titleInput = screen.getByTestId('card-title-input');
    const detailsInput = screen.getByTestId('card-details-input');
    const submitBtn = screen.getByTestId('modal-submit-btn');

    fireEvent.change(titleInput, { target: { value: 'New Test Task' } });
    fireEvent.change(detailsInput, { target: { value: 'Some test details' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('New Test Task')).toBeInTheDocument();
    expect(screen.getByText('Some test details')).toBeInTheDocument();
  });

  it('deletes an existing card when delete button is clicked', () => {
    render(<KanbanBoard />);
    expect(screen.getByText('Research Database Indexing Strategies')).toBeInTheDocument();

    const deleteBtn = screen.getByTestId('delete-card-card-1');
    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Research Database Indexing Strategies')).not.toBeInTheDocument();
  });
});
