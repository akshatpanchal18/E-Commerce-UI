import React, { useState } from "react";
import styled from "styled-components";

const Header = ({ totalProducts, onSortChange }) => {
  const [sortOption, setSortOption] = useState("default");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSortChange(e.target.value); // Notify parent about sort change
  };

  return (
    <HeaderWrapper>
      <h1>Products ({totalProducts})</h1>
      <SortDropdown value={sortOption} onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="price:asc">Price: Low to High</option>
        <option value="price:desc">Price: High to Low</option>
        <option value="name:asc">A - Z</option>
        <option value="name:desc">Z - A</option>
      </SortDropdown>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width:1200px;
  margin:20px 20px;

  h1 {
    margin: 0;
  }
    @media(max-width:768px){
    max-width:300px;
    margin:10px 0;
    h1{
    font-size:1rem;
    }
    }
`;

const SortDropdown = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  cursor: pointer;
   @media(max-width:768px){
    font-size:12px;
    padding:4px;
   
    }
`;

export default Header;
