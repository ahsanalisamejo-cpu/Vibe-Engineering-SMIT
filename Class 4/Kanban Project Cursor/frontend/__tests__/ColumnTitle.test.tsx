import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ColumnTitle } from "@/components/ColumnTitle";

describe("ColumnTitle", () => {
  it("enters edit mode on click", async () => {
    const user = userEvent.setup();
    render(<ColumnTitle title="Backlog" onRename={vi.fn()} />);

    await user.click(screen.getByTestId("column-title"));
    expect(screen.getByTestId("column-title-input")).toHaveValue("Backlog");
  });

  it("saves on Enter", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();

    render(<ColumnTitle title="Backlog" onRename={onRename} />);
    await user.click(screen.getByTestId("column-title"));

    const input = screen.getByTestId("column-title-input");
    await user.clear(input);
    await user.type(input, "Ideas{Enter}");

    expect(onRename).toHaveBeenCalledWith("Ideas");
    expect(screen.getByTestId("column-title")).toHaveTextContent("Ideas");
  });

  it("cancels on Escape", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();

    render(<ColumnTitle title="Backlog" onRename={onRename} />);
    await user.click(screen.getByTestId("column-title"));

    const input = screen.getByTestId("column-title-input");
    await user.clear(input);
    await user.type(input, "Changed{Escape}");

    expect(onRename).not.toHaveBeenCalled();
    expect(screen.getByTestId("column-title")).toHaveTextContent("Backlog");
  });

  it("reverts empty titles", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();

    render(<ColumnTitle title="Backlog" onRename={onRename} />);
    await user.click(screen.getByTestId("column-title"));

    const input = screen.getByTestId("column-title-input");
    await user.clear(input);
    await user.type(input, "{Enter}");

    expect(onRename).not.toHaveBeenCalled();
    expect(screen.getByTestId("column-title")).toHaveTextContent("Backlog");
  });
});
