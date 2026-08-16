import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddCardForm } from '@/components/AddCardForm';

describe('AddCardForm Component', () => {
  const mockOnAdd = vi.fn();

  it('renders Add Card button initially', () => {
    render(<AddCardForm onAdd={mockOnAdd} />);
    expect(screen.getByRole('button', { name: /add card/i })).toBeInTheDocument();
  });

  it('shows form when Add Card button is clicked', async () => {
    render(<AddCardForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: /add card/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Card title')).toBeInTheDocument();
      expect(screen.getByLabelText('Card details')).toBeInTheDocument();
    });
  });

  it('calls onAdd with title and details when Add is clicked', async () => {
    const user = userEvent.setup();
    render(<AddCardForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: /add card/i });
    fireEvent.click(addButton);

    const titleInput = screen.getByLabelText('Card title');
    const detailsInput = screen.getByLabelText('Card details');

    await user.type(titleInput, 'New Card');
    await user.type(detailsInput, 'Card details');

    const submitButton = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(submitButton);

    expect(mockOnAdd).toHaveBeenCalledWith('New Card', 'Card details');
  });

  it('shows error when title is empty', async () => {
    render(<AddCardForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: /add card/i });
    fireEvent.click(addButton);

    const submitButton = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Card title cannot be empty')).toBeInTheDocument();
    });

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('resets form after successful add', async () => {
    const user = userEvent.setup();
    render(<AddCardForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: /add card/i });
    fireEvent.click(addButton);

    const titleInput = screen.getByLabelText('Card title') as HTMLInputElement;
    await user.type(titleInput, 'Test Card');

    const submitButton = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(titleInput.value).toBe('');
    });
  });

  it('closes form when Cancel button is clicked', async () => {
    render(<AddCardForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: /add card/i });
    fireEvent.click(addButton);

    const cancelButton = screen.getByLabelText('Cancel adding card');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Card title')).not.toBeInTheDocument();
    });
  });

  it('closes form on Escape key', async () => {
    render(<AddCardForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: /add card/i });
    fireEvent.click(addButton);

    const detailsInput = screen.getByLabelText('Card details');
    fireEvent.keyDown(detailsInput, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByLabelText('Card title')).not.toBeInTheDocument();
    });
  });
});
