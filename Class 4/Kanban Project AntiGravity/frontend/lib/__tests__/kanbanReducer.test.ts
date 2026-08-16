import { describe, it, expect } from 'vitest';
import { kanbanReducer } from '../kanbanReducer';
import { BoardData } from '@/types/kanban';

describe('kanbanReducer', () => {
  const initialTestState: BoardData = {
    columns: [
      { id: 'col-1', title: 'To Do', cardIds: ['card-1', 'card-2'] },
      { id: 'col-2', title: 'Done', cardIds: ['card-3'] },
    ],
    cards: {
      'card-1': { id: 'card-1', title: 'Task 1', details: 'Details 1' },
      'card-2': { id: 'card-2', title: 'Task 2', details: 'Details 2' },
      'card-3': { id: 'card-3', title: 'Task 3', details: 'Details 3' },
    },
  };

  it('should rename a column correctly', () => {
    const newState = kanbanReducer(initialTestState, {
      type: 'RENAME_COLUMN',
      payload: { columnId: 'col-1', newTitle: 'Backlog Tasks' },
    });

    expect(newState.columns[0].title).toBe('Backlog Tasks');
    expect(newState.columns[1].title).toBe('Done');
  });

  it('should not rename a column if new title is empty whitespace', () => {
    const newState = kanbanReducer(initialTestState, {
      type: 'RENAME_COLUMN',
      payload: { columnId: 'col-1', newTitle: '   ' },
    });

    expect(newState.columns[0].title).toBe('To Do');
  });

  it('should add a new card to the specified column', () => {
    const newState = kanbanReducer(initialTestState, {
      type: 'ADD_CARD',
      payload: {
        columnId: 'col-1',
        title: 'New Feature',
        details: 'Feature specifications',
      },
    });

    const newCardId = newState.columns[0].cardIds[0];
    expect(newState.columns[0].cardIds.length).toBe(3);
    expect(newState.cards[newCardId]).toBeDefined();
    expect(newState.cards[newCardId].title).toBe('New Feature');
    expect(newState.cards[newCardId].details).toBe('Feature specifications');
  });

  it('should not add a card if title is blank', () => {
    const newState = kanbanReducer(initialTestState, {
      type: 'ADD_CARD',
      payload: {
        columnId: 'col-1',
        title: '   ',
        details: 'No title provided',
      },
    });

    expect(newState.columns[0].cardIds.length).toBe(2);
  });

  it('should delete a card and remove it from the column and card registry', () => {
    const newState = kanbanReducer(initialTestState, {
      type: 'DELETE_CARD',
      payload: { columnId: 'col-1', cardId: 'card-1' },
    });

    expect(newState.columns[0].cardIds).toEqual(['card-2']);
    expect(newState.cards['card-1']).toBeUndefined();
    expect(newState.cards['card-2']).toBeDefined();
  });

  it('should reorder a card within the same column', () => {
    const newState = kanbanReducer(initialTestState, {
      type: 'MOVE_CARD',
      payload: {
        sourceColumnId: 'col-1',
        destinationColumnId: 'col-1',
        sourceIndex: 0,
        destinationIndex: 1,
        cardId: 'card-1',
      },
    });

    expect(newState.columns[0].cardIds).toEqual(['card-2', 'card-1']);
  });

  it('should move a card across different columns', () => {
    const newState = kanbanReducer(initialTestState, {
      type: 'MOVE_CARD',
      payload: {
        sourceColumnId: 'col-1',
        destinationColumnId: 'col-2',
        sourceIndex: 0,
        destinationIndex: 1,
        cardId: 'card-1',
      },
    });

    expect(newState.columns[0].cardIds).toEqual(['card-2']);
    expect(newState.columns[1].cardIds).toEqual(['card-3', 'card-1']);
    expect(newState.cards['card-1']).toBeDefined();
  });
});
