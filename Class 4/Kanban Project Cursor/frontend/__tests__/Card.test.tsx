import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DndContext } from "@dnd-kit/core";
import { KanbanCard } from "@/components/Card";

function renderCard(onDelete = vi.fn()) {
  return render(
    <DndContext>
      <KanbanCard
        card={{ id: "c1", title: "Test card", details: "Test details" }}
        onDelete={onDelete}
      />
    </DndContext>,
  );
}

describe("KanbanCard", () => {
  it("renders title and details", () => {
    renderCard();
    expect(screen.getByText("Test card")).toBeInTheDocument();
    expect(screen.getByText("Test details")).toBeInTheDocument();
  });

  it("calls onDelete when delete is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    renderCard(onDelete);
    await user.click(screen.getByTestId("delete-card-c1"));

    expect(onDelete).toHaveBeenCalledWith("c1");
  });
});
