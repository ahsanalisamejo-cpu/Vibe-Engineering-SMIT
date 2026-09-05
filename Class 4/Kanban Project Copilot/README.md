# Kanban Board

A modern, single-board Kanban application built with Next.js, React, and TailwindCSS. Manage tasks with drag-and-drop, create/delete cards, and customize column names.

## Features

- **5 Renameable Columns**: To Do, In Progress, In Review, Testing, Done (or rename them as you like)
- **Drag-and-Drop**: Move cards between columns and reorder within columns
- **Add Cards**: Quickly add new cards with title and details
- **Delete Cards**: Remove cards from any column
- **Rename Columns**: Click the edit icon on any column header to rename it
- **Responsive Design**: Works on desktop and tablet devices
- **Professional UI**: Clean, modern interface with brand colors

## Tech Stack

- **Frontend Framework**: Next.js 15+ with TypeScript
- **Styling**: TailwindCSS
- **Drag-and-Drop**: @dnd-kit
- **Icons**: Lucide React
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Add a Card**: Click the "+ Add Card" button at the bottom of any column
2. **Delete a Card**: Click the trash icon on any card
3. **Rename a Column**: Click the edit icon on the column header
4. **Move a Card**: Drag a card to move it between columns or reorder it within a column

## Project Structure

```
frontend/
├── app/
│   ├── data/          # Initial board data
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/        # React components
│   ├── Board.tsx      # Main board component
│   ├── Column.tsx     # Column component
│   ├── Card.tsx       # Card component
│   ├── ColumnHeader.tsx
│   └── AddCardForm.tsx
├── types/
│   └── index.ts       # TypeScript type definitions
├── utils/
│   └── idGenerator.ts # Utility functions
└── public/            # Static assets
```

## Colors

The app uses a custom color scheme:

- **Yellow**: `#ecad0a` (Accent)
- **Blue**: `#209dd7` (Primary)
- **Purple**: `#753991` (Secondary)
- **Navy**: `#032147` (Dark Background)
- **Gray**: `#888888` (Text)

## Notes

- This is an MVP with no data persistence. Refreshing the page resets to the initial state.
- All data is stored in React component state (client-side only).
- No backend API required.

## Future Enhancements

- Data persistence (localStorage or database)
- User authentication
- Multi-board support
- Card filters and search
- Card labels and priority levels
- Activity history
- Export functionality

## License

MIT
