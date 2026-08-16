# Kanban Project MVP

A lightweight, modern Kanban Project Management web application built with Next.js and pure CSS design tokens.

## Features

- Single board layout with 5 renameable columns: Backlog, To Do, In Progress, Review, and Done.
- Drag-and-drop card positioning between columns.
- Card creation with title and details fields.
- Card deletion.
- Pre-populated dummy tasks on initial load.
- Strictly styled according to brand color specifications.

## Technology Stack

- Next.js 16 (App Router, Client-Rendered)
- TypeScript
- Vanilla CSS with custom property design tokens
- @hello-pangea/dnd (Drag and Drop)
- Lucide React (Icons)
- Vitest and React Testing Library (Unit & Component Tests)
- Playwright (End-to-End Integration Tests)

## Getting Started

### Development Server

Navigate into the frontend directory and start the development server:

```bash
cd frontend
npm install
npm run dev
```

The application runs on `http://localhost:3000`.

### Running Tests

Run unit and component tests:

```bash
cd frontend
npm run test
```

Run end-to-end integration tests:

```bash
cd frontend
npm run test:e2e
```

### Production Build

```bash
cd frontend
npm run build
npm run start
```
