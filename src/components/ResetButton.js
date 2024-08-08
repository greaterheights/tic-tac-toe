import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
`;

const ResetButton = ({ onClick }) => {
    return <StyledButton onClick={onClick}>Reset</StyledButton>;
};

export default ResetButton;
