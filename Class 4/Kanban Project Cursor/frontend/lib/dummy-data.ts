import type { BoardState } from "./types";

export const initialBoardState: BoardState = {
  columns: [
    { id: "col-backlog", title: "Backlog", cardIds: ["c1", "c2", "c3"] },
    { id: "col-ready", title: "Ready", cardIds: ["c4", "c5"] },
    { id: "col-in-progress", title: "In Progress", cardIds: ["c6", "c7"] },
    { id: "col-review", title: "Review", cardIds: ["c8"] },
    { id: "col-done", title: "Done", cardIds: ["c9", "c10"] },
  ],
  cards: {
    c1: {
      id: "c1",
      title: "Research competitors",
      details: "Review top 5 Kanban tools and note UX patterns.",
    },
    c2: {
      id: "c2",
      title: "Define color tokens",
      details: "Map brand palette to CSS variables.",
    },
    c3: {
      id: "c3",
      title: "Draft user stories",
      details: "Capture add, delete, rename, and drag flows.",
    },
    c4: {
      id: "c4",
      title: "Set up Next.js project",
      details: "Scaffold frontend with Tailwind and testing.",
    },
    c5: {
      id: "c5",
      title: "Design board layout",
      details: "Five columns with responsive horizontal scroll.",
    },
    c6: {
      id: "c6",
      title: "Build card component",
      details: "Title, details, and delete affordance.",
    },
    c7: {
      id: "c7",
      title: "Implement drag and drop",
      details: "Move cards within and across columns.",
    },
    c8: {
      id: "c8",
      title: "Write unit tests",
      details: "Cover reducers and key UI interactions.",
    },
    c9: {
      id: "c9",
      title: "Polish typography",
      details: "Apply Geist font and spacing scale.",
    },
    c10: {
      id: "c10",
      title: "Smoke test MVP",
      details: "Verify all flows before demo.",
    },
  },
};
