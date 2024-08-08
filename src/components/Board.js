import React from "react";
import styled from "styled-components";
import Square from "./Square";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

const Board = ({ board, onClick }) => {
    return (
        <StyledBoard>
            {board.map((value, index) => (
                <Square key={index} value={value} onClick={() => onClick(index)} />
            ))}
        </StyledBoard>
    );
};

export default Board;
