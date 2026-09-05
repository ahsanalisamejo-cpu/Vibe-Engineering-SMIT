export interface Card {
  id: string;
  title: string;
  details: string;
}

export interface Column {
  id: string;
  name: string;
  cardIds: string[];
}

export interface Board {
  id: string;
  columns: Record<string, Column>;
  cards: Record<string, Card>;
}
