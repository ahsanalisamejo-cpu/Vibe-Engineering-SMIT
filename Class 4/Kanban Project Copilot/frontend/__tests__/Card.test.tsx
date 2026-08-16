import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@/components/Card';

describe('Card Component', () => {
  const mockCard = {
    id: 'card-1',
    title: 'Test Card',
    details: 'Test Details',
  };

  const mockOnDelete = vi.fn();

  it('renders card with title and details', () => {
    render(<Card card={mockCard} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test Details')).toBeInTheDocument();
  });

  it('renders delete button with accessible label', () => {
    render(<Card card={mockCard} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', {
      name: /delete card test card/i,
    });
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked and confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<Card card={mockCard} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', {
      name: /delete card test card/i,
    });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('card-1');
  });

  it('does not call onDelete when confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<Card card={mockCard} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', {
      name: /delete card test card/i,
    });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('has article role for semantic HTML', () => {
    const { container } = render(<Card card={mockCard} onDelete={mockOnDelete} />);
    const article = container.querySelector('[role="article"]');
    expect(article).toBeInTheDocument();
  });
});
