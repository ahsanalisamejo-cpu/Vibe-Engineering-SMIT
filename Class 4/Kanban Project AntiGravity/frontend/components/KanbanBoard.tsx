'use client';

import React, { useReducer, useState, useMemo } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { initialBoardData } from '@/lib/initialData';
import { kanbanReducer } from '@/lib/kanbanReducer';
import { Navbar } from './Navbar';
import { ColumnContainer } from './ColumnContainer';
import { AddCardModal } from './AddCardModal';

export const KanbanBoard: React.FC = () => {
  const [boardData, dispatch] = useReducer(kanbanReducer, initialBoardData);
  const [activeModalColumnId, setActiveModalColumnId] = useState<string | null>(null);

  const totalCards = useMemo(() => {
    return Object.keys(boardData.cards).length;
  }, [boardData.cards]);

  const activeColumn = useMemo(() => {
    if (!activeModalColumnId) return null;
    return boardData.columns.find((col) => col.id === activeModalColumnId) || null;
  }, [activeModalColumnId, boardData.columns]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch({
      type: 'MOVE_CARD',
      payload: {
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        cardId: draggableId,
      },
    });
  };

  const handleRenameColumn = (columnId: string, newTitle: string) => {
    dispatch({
      type: 'RENAME_COLUMN',
      payload: { columnId, newTitle },
    });
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    dispatch({
      type: 'DELETE_CARD',
      payload: { columnId, cardId },
    });
  };

  const handleAddCard = (title: string, details: string) => {
    if (!activeModalColumnId) return;
    dispatch({
      type: 'ADD_CARD',
      payload: {
        columnId: activeModalColumnId,
        title,
        details,
      },
    });
  };

  return (
    <div className="app-container">
      <Navbar totalColumns={boardData.columns.length} totalCards={totalCards} />
      <main className="board-wrapper">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="board-container" data-testid="kanban-board">
            {boardData.columns.map((column) => {
              const columnCards = column.cardIds
                .map((cardId) => boardData.cards[cardId])
                .filter(Boolean);

              return (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  cards={columnCards}
                  onRenameColumn={handleRenameColumn}
                  onDeleteCard={handleDeleteCard}
                  onOpenAddCardModal={(colId) => setActiveModalColumnId(colId)}
                />
              );
            })}
          </div>
        </DragDropContext>
      </main>

      <AddCardModal
        isOpen={Boolean(activeModalColumnId)}
        columnTitle={activeColumn ? activeColumn.title : ''}
        onClose={() => setActiveModalColumnId(null)}
        onSubmit={handleAddCard}
      />
    </div>
  );
};
