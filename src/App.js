import React, { useState } from "react";
import styled from "styled-components";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 5px 10px;
  font-size: 1em;
  cursor: pointer;
`;

const StyledDiv = styled.div`
  font-size: 2rem;
  margin: 20px 0 0 0;
`;

const App = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const newWinner = calculateWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
    };

    return (
        <Wrapper>
            <h1>Tic Tac Toe</h1>
            <Board board={board} onClick={handleClick} />

            {winner && <StyledDiv> {winner} wins!</StyledDiv>}

            <StyledButton onClick={handleReset}>Reset</StyledButton>
        </Wrapper>
    );
};

const calculateWinner = (board) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

export default App;
