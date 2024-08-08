import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../components/Board";

test("Renders the board with 9 squares", () => {
    const board = Array(9).fill(null);
    render(<Board board={board} onClick={() => {}} />);
    const squares = screen.getAllByRole("button");
    expect(squares).toHaveLength(9);
});

test("Clicking a square triggers the onClick callback", () => {
    const board = Array(9).fill(null);
    const handleClick = jest.fn();
    render(<Board board={board} onClick={handleClick} />);
    const squares = screen.getAllByRole("button");
    fireEvent.click(squares[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
});
