import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BoardProvider, useBoard } from "@/context/BoardContext";

function TestConsumer() {
  const { state, dispatch } = useBoard();

  return (
    <div>
      <span data-testid="card-count">{Object.keys(state.cards).length}</span>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: "ADD_CARD",
            columnId: "col-backlog",
            title: "From test",
            details: "",
          })
        }
      >
        Add
      </button>
    </div>
  );
}

describe("BoardProvider", () => {
  it("provides initial dummy data and dispatches actions", async () => {
    const user = userEvent.setup();

    render(
      <BoardProvider>
        <TestConsumer />
      </BoardProvider>,
    );

    expect(screen.getByTestId("card-count")).toHaveTextContent("10");
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("card-count")).toHaveTextContent("11");
  });
});
