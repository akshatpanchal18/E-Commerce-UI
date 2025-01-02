import React from "react";
import styled from "styled-components";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <PaginationWrapper>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  margin-top: 20px;
  text-align: center;

  button {
    margin: 0 5px;
    padding: 8px 12px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background-color: #678a7b;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #254336;
    }

    &:hover {
      background-color: #254336;
    }
  }
`;

export default Pagination;
