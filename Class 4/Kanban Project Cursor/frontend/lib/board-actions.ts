import type { BoardState } from "./types";

export function createCardId(): string {
  return crypto.randomUUID();
}

export function findColumnByCardId(
  state: BoardState,
  cardId: string,
): string | undefined {
  return state.columns.find((col) => col.cardIds.includes(cardId))?.id;
}

export function addCard(
  state: BoardState,
  columnId: string,
  title: string,
  details: string,
): BoardState {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) return state;

  const id = createCardId();
  const card = { id, title: trimmedTitle, details: details.trim() };

  return {
    cards: { ...state.cards, [id]: card },
    columns: state.columns.map((col) =>
      col.id === columnId ? { ...col, cardIds: [...col.cardIds, id] } : col,
    ),
  };
}

export function deleteCard(state: BoardState, cardId: string): BoardState {
  if (!state.cards[cardId]) return state;

  const { [cardId]: _removed, ...remainingCards } = state.cards;

  return {
    cards: remainingCards,
    columns: state.columns.map((col) => ({
      ...col,
      cardIds: col.cardIds.filter((id) => id !== cardId),
    })),
  };
}

export function renameColumn(
  state: BoardState,
  columnId: string,
  title: string,
): BoardState {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) return state;

  return {
    ...state,
    columns: state.columns.map((col) =>
      col.id === columnId ? { ...col, title: trimmedTitle } : col,
    ),
  };
}

export function moveCard(
  state: BoardState,
  cardId: string,
  fromColumnId: string,
  toColumnId: string,
  toIndex: number,
): BoardState {
  const sourceColumn = state.columns.find((col) => col.id === fromColumnId);
  const destColumn = state.columns.find((col) => col.id === toColumnId);

  if (!sourceColumn || !destColumn || !sourceColumn.cardIds.includes(cardId)) {
    return state;
  }

  const sourceIds = sourceColumn.cardIds.filter((id) => id !== cardId);
  const destIds =
    fromColumnId === toColumnId
      ? sourceIds
      : [...destColumn.cardIds.filter((id) => id !== cardId)];

  const clampedIndex = Math.max(0, Math.min(toIndex, destIds.length));
  destIds.splice(clampedIndex, 0, cardId);

  return {
    ...state,
    columns: state.columns.map((col) => {
      if (col.id === fromColumnId && fromColumnId === toColumnId) {
        return { ...col, cardIds: destIds };
      }
      if (col.id === fromColumnId) {
        return { ...col, cardIds: sourceIds };
      }
      if (col.id === toColumnId) {
        return { ...col, cardIds: destIds };
      }
      return col;
    }),
  };
}

export function boardReducer(
  state: BoardState,
  action: import("./types").BoardAction,
): BoardState {
  switch (action.type) {
    case "ADD_CARD":
      return addCard(state, action.columnId, action.title, action.details);
    case "DELETE_CARD":
      return deleteCard(state, action.cardId);
    case "RENAME_COLUMN":
      return renameColumn(state, action.columnId, action.title);
    case "MOVE_CARD":
      return moveCard(
        state,
        action.cardId,
        action.fromColumnId,
        action.toColumnId,
        action.toIndex,
      );
    default:
      return state;
  }
}
