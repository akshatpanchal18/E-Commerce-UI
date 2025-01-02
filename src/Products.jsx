import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Components/SideBar";
import ProductGrid from "./Components/ProductGrid";
import Pagination from "./Components/Pagination";
import { useProduct } from "./Context/ProductContext";
import Header from "./Components/Header";

const Products = () => {
  
  const { products,totalProducts,totalPages, fetchProducts, currentPage,setSortOption } = useProduct();


  const handlePageChange = (page) => {
    fetchProducts(page); // Call fetchProducts with the selected page
    
  };
  const handleSortChange = (sortOption) => {
    setSortOption(sortOption); // Update the sort option in the filter context
  };

  return (
    <PageWrapper>
      <Sidebar/>
      <MainContent>
      <Header totalProducts={totalProducts} onSortChange={handleSortChange} />
        <ProductGrid products={products} />
        <Pagination totalPages={totalPages}onPageChange={handlePageChange}currentPage={currentPage}/>
      </MainContent>
      
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 20px;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 3;
  h1{
  text-align:center;
  margin:0.5rem 0;
  }
`;

export default Products;
