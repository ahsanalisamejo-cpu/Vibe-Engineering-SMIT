import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AddCardForm } from "@/components/AddCardForm";

describe("AddCardForm", () => {
  it("submits title and details", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onCancel = vi.fn();

    render(<AddCardForm onAdd={onAdd} onCancel={onCancel} />);

    await user.type(screen.getByTestId("add-card-title"), "New card");
    await user.type(screen.getByTestId("add-card-details"), "Details here");
    await user.click(screen.getByTestId("add-card-submit"));

    expect(onAdd).toHaveBeenCalledWith("New card", "Details here");
  });

  it("does not submit without a title", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<AddCardForm onAdd={onAdd} onCancel={vi.fn()} />);

    await user.click(screen.getByTestId("add-card-submit"));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("calls onCancel when cancel is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<AddCardForm onAdd={vi.fn()} onCancel={onCancel} />);
    await user.click(screen.getByTestId("add-card-cancel"));

    expect(onCancel).toHaveBeenCalled();
  });
});
