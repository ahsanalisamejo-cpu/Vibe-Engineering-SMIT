'use client';

import dynamic from 'next/dynamic';

// Dynamically import KanbanBoard with SSR disabled for drag-and-drop hydration stability
const KanbanBoard = dynamic(
  () => import('@/components/KanbanBoard').then((mod) => mod.KanbanBoard),
  { ssr: false }
);

export default function HomePage() {
  return <KanbanBoard />;
}
