import { BoardData } from '@/types/kanban';

export const initialBoardData: BoardData = {
  columns: [
    {
      id: 'col-backlog',
      title: 'Backlog',
      cardIds: ['card-1', 'card-2'],
    },
    {
      id: 'col-todo',
      title: 'To Do',
      cardIds: ['card-3', 'card-4'],
    },
    {
      id: 'col-in-progress',
      title: 'In Progress',
      cardIds: ['card-5', 'card-6'],
    },
    {
      id: 'col-review',
      title: 'Review',
      cardIds: ['card-7'],
    },
    {
      id: 'col-done',
      title: 'Done',
      cardIds: ['card-8', 'card-9'],
    },
  ],
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Research Database Indexing Strategies',
      details: 'Analyze composite index performance and query execution plans for reporting queries.',
    },
    'card-2': {
      id: 'card-2',
      title: 'Define Design Tokens & Accessibility Guidelines',
      details: 'Audit WCAG 2.1 AA color contrast compliance across dark navy and light surfaces.',
    },
    'card-3': {
      id: 'card-3',
      title: 'Implement NextJS App Router Scaffolding',
      details: 'Set up client components, layout structure, and responsive viewport meta tags.',
    },
    'card-4': {
      id: 'card-4',
      title: 'Draft End-to-End Test Scenarios',
      details: 'Create Playwright spec coverage for drag-and-drop workflows and column renaming.',
    },
    'card-5': {
      id: 'card-5',
      title: 'Build Drag and Drop Kanban Board',
      details: 'Integrate accessible drag handlers with smooth column reordering transitions.',
    },
    'card-6': {
      id: 'card-6',
      title: 'Refine Modern Visual Styling',
      details: 'Apply custom color tokens, glassmorphism headers, and polished hover micro-animations.',
    },
    'card-7': {
      id: 'card-7',
      title: 'Code Review: Card Creation & Deletion Logic',
      details: 'Verify pure state transformations and prevent orphan card keys upon deletion.',
    },
    'card-8': {
      id: 'card-8',
      title: 'Setup Vitest Component Testing Harness',
      details: 'Configured jsdom environment, React Testing Library matchers, and path aliases.',
    },
    'card-9': {
      id: 'card-9',
      title: 'Project Architecture & Spec Alignment',
      details: 'Aligned with MVP requirements: 1 board, 5 columns, title and details fields.',
    },
  },
};
