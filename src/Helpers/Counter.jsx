import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

function Counter({count,setCount}) {
  

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1); // Increment count by 1
  };

  const handleDecrement = () => {
    setCount(prevCount => Math.max(prevCount - 1, 1)); // Decrement count by 1, ensuring it doesn't go below 0
  };

  return (
    <CounterContainer>
      <Button onClick={handleDecrement}>
        <FaMinus />
      </Button>
      <Number>{count}</Number>
      <Button onClick={handleIncrement}>
        <FaPlus />
      </Button>
    </CounterContainer>
  );
}

const CounterContainer = styled.div`
  display: flex;
  place-content: flex-start;
//   justify-content: center;
  margin: 20px;
`;

const Button = styled.button`
//   background-color: #007bff;
  color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 5px 3px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 10px;

  &:hover {
    // background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const Number = styled.p`
  font-size: 24px;
  margin: 0 10px;
`;

export default Counter;
