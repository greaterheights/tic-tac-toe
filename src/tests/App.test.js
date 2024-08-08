import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import App from "../App";

test("Renders Tic Tac Toe header", () => {
    render(<App />);
    const headerElement = screen.getByText(/Tic Tac Toe/i);
    expect(headerElement).toBeInTheDocument();
});

test("Clicking a square updates the board", () => {
    render(<App />);
    const squares = screen.getAllByRole("button");
    act(() => {
        fireEvent.click(squares[0]);
    });
    expect(squares[0]).toHaveTextContent("X");
});

test("Reset button appears after a win or draw", () => {
    render(<App />);
    const squares = screen.getAllByRole("button");
    act(() => {
        fireEvent.click(squares[0]); // X
        fireEvent.click(squares[1]); // O
        fireEvent.click(squares[3]); // X
        fireEvent.click(squares[4]); // O
        fireEvent.click(squares[6]); // X
    });
    const resetButton = screen.getByText(/Reset/i);
    expect(resetButton).toBeInTheDocument();
});
