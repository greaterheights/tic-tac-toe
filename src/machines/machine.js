import { createMachine, assign } from "xstate";

const isWinner = (board) => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // It returns the winner (X or O)
        }
    }
    return null; // No winner
};

// Checking if the board is full complated (draw)
const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
};

export const machine = createMachine(
    {
        id: "game",
        initial: "idle",
        context: {
            board: Array(9).fill(null), // empty
            currentPlayer: "X", // first player
            winner: null, // init winner as null
        },
        states: {
            idle: {
                on: {
                    START: {
                        target: "playing",
                    },
                },
            },
            playing: {
                on: {
                    MAKE_MOVE: {
                        actions: "makeMove",
                        target: "checkForWinner",
                    },
                },
            },
            checkForWinner: {
                always: [
                    {
                        target: "won",
                        cond: "hasWinner",
                        actions: assign({
                            winner: (context) => isWinner(context.board),
                        }),
                    },
                    { target: "draw", cond: "isDraw" },
                    { target: "playing", actions: "switchPlayer" },
                ],
            },
            won: {
                type: "final",
            },
            draw: {
                type: "final",
            },
        },
    },
    {
        actions: {
            makeMove: assign({
                board: (context, event) => {
                    const newBoard = [...context.board];
                    newBoard[event.index] = context.currentPlayer; // The board is updateing with the current player's move
                    return newBoard;
                },
            }),
            switchPlayer: assign({
                currentPlayer: (context) => (context.currentPlayer === "X" ? "O" : "X"),
            }),
        },
        guards: {
            hasWinner: (context) => isWinner(context.board) !== null,
            isDraw: (context) => isBoardFull(context.board),
        },
    }
);
