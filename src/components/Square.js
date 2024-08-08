import React from "react";
import styled from "styled-components";

const StyledSquare = styled.button`
    width: 100px;
    height: 100px;
    font-size: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
`;

const Square = ({ value, onClick }) => {
    return <StyledSquare onClick={onClick}>{value}</StyledSquare>;
};

export default Square;
