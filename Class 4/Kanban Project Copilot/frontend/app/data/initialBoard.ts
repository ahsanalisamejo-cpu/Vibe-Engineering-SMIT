import { Board } from '@/types';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const sampleCards = {
  'card-1': {
    id: 'card-1',
    title: 'Design Kanban UI',
    details: 'Create mockups and design the user interface',
  },
  'card-2': {
    id: 'card-2',
    title: 'Setup Next.js Project',
    details: 'Initialize Next.js with TypeScript and Tailwind',
  },
  'card-3': {
    id: 'card-3',
    title: 'Build Card Component',
    details: 'Create reusable Card component with drag support',
  },
  'card-4': {
    id: 'card-4',
    title: 'Implement DnD',
    details: 'Add drag-and-drop functionality with @dnd-kit',
  },
  'card-5': {
    id: 'card-5',
    title: 'Add Tests',
    details: 'Write unit and integration tests',
  },
  'card-6': {
    id: 'card-6',
    title: 'Review Code',
    details: 'Perform code review and refactoring',
  },
  'card-7': {
    id: 'card-7',
    title: 'Deploy to Production',
    details: 'Deploy the app to production environment',
  },
  'card-8': {
    id: 'card-8',
    title: 'Monitor Performance',
    details: 'Track metrics and optimize performance',
  },
};

export const initialBoard: Board = {
  id: 'board-1',
  columns: {
    'col-1': {
      id: 'col-1',
      name: 'To Do',
      cardIds: ['card-1', 'card-2', 'card-3'],
    },
    'col-2': {
      id: 'col-2',
      name: 'In Progress',
      cardIds: ['card-4', 'card-5'],
    },
    'col-3': {
      id: 'col-3',
      name: 'In Review',
      cardIds: ['card-6'],
    },
    'col-4': {
      id: 'col-4',
      name: 'Testing',
      cardIds: [],
    },
    'col-5': {
      id: 'col-5',
      name: 'Done',
      cardIds: ['card-7', 'card-8'],
    },
  },
  cards: sampleCards,
};
