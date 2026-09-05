import { BoardData, Card } from '@/types/kanban';

export type KanbanAction =
  | { type: 'RENAME_COLUMN'; payload: { columnId: string; newTitle: string } }
  | { type: 'ADD_CARD'; payload: { columnId: string; title: string; details: string } }
  | { type: 'DELETE_CARD'; payload: { columnId: string; cardId: string } }
  | {
      type: 'MOVE_CARD';
      payload: {
        sourceColumnId: string;
        destinationColumnId: string;
        sourceIndex: number;
        destinationIndex: number;
        cardId: string;
      };
    };

export function kanbanReducer(state: BoardData, action: KanbanAction): BoardData {
  switch (action.type) {
    case 'RENAME_COLUMN': {
      const { columnId, newTitle } = action.payload;
      const trimmed = newTitle.trim();
      if (!trimmed) return state;

      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === columnId ? { ...col, title: trimmed } : col
        ),
      };
    }

    case 'ADD_CARD': {
      const { columnId, title, details } = action.payload;
      const trimmedTitle = title.trim();
      if (!trimmedTitle) return state;

      const newId = `card-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newCard: Card = {
        id: newId,
        title: trimmedTitle,
        details: details.trim(),
      };

      return {
        ...state,
        cards: {
          ...state.cards,
          [newId]: newCard,
        },
        columns: state.columns.map((col) =>
          col.id === columnId
            ? { ...col, cardIds: [newId, ...col.cardIds] }
            : col
        ),
      };
    }

    case 'DELETE_CARD': {
      const { columnId, cardId } = action.payload;
      const remainingCards = { ...state.cards };
      delete remainingCards[cardId];

      return {
        ...state,
        cards: remainingCards,
        columns: state.columns.map((col) =>
          col.id === columnId
            ? { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) }
            : col
        ),
      };
    }

    case 'MOVE_CARD': {
      const {
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
        cardId,
      } = action.payload;

      // Moving within the same column
      if (sourceColumnId === destinationColumnId) {
        return {
          ...state,
          columns: state.columns.map((col) => {
            if (col.id !== sourceColumnId) return col;
            const updatedCardIds = Array.from(col.cardIds);
            updatedCardIds.splice(sourceIndex, 1);
            updatedCardIds.splice(destinationIndex, 0, cardId);
            return {
              ...col,
              cardIds: updatedCardIds,
            };
          }),
        };
      }

      // Moving to a different column
      return {
        ...state,
        columns: state.columns.map((col) => {
          if (col.id === sourceColumnId) {
            const sourceCardIds = Array.from(col.cardIds);
            sourceCardIds.splice(sourceIndex, 1);
            return { ...col, cardIds: sourceCardIds };
          }
          if (col.id === destinationColumnId) {
            const destCardIds = Array.from(col.cardIds);
            destCardIds.splice(destinationIndex, 0, cardId);
            return { ...col, cardIds: destCardIds };
          }
          return col;
        }),
      };
    }

    default:
      return state;
  }
}
