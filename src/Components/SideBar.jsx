import React from "react";
import styled from "styled-components";
import { useProduct } from "../Context/ProductContext";

const Sidebar = () => {
  const {
    brandOpt,
    categoryOpt,
    setIsBrand,
    setIsCategory,
    setIsSearch,
    clearFilters,
    filters
  } = useProduct();

  return (
    <SidebarWrapper>
      <h3>Filter & Search</h3>
      <div className="filter-group">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.text}
          onChange={(e) => setIsSearch(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => setIsCategory(e.target.value)}
        >
          {Array.isArray(categoryOpt) && categoryOpt.length > 0 ? (
            categoryOpt.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))
          ) : (
            <option disabled>No Categories Available</option>
          )}
        </select>
        <label>Brands:</label>
        <select
          value={filters.brand}
          onChange={(e) => setIsBrand(e.target.value)}
        >
          {Array.isArray(brandOpt) && brandOpt.length > 0 ? (
            brandOpt.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))
          ) : (
            <option disabled>No Brand's Available</option>
          )}
        </select>
      </div>
      <ClearButton onClick={clearFilters}>Clear All Filters</ClearButton>
    </SidebarWrapper>
  );
};
const ClearButton = styled.button`
  background-color: #346349;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: rgb(28, 54, 40);
  }
`;

const SidebarWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  h3 {
    margin-bottom: 20px;
  }

  .filter-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input,
    select {
      width: 100%;
      padding: 8px;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  @media (max-width: 768px) {
    // margin:0px auto;
    max-width: 100%;
  }
`;

export default Sidebar;
