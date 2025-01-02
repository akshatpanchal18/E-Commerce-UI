import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Amount from "../Helpers/Amount";

const ProductGrid = ({ products }) => {
  const NA = "NA";
  return (
    <>
      <Container>
        {/* <Title>Product List</Title> */}
        <ProductList>
          {products.map((product) => (
            <ProductCard key={product._id}>
              <NavLink to={`/single-product/${product._id}`}>
                <div className="image">
                  <img
                    src={
                      product.image ||
                      "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
                    }
                    alt={product.name}
                  />
                </div>
                <div className="image-name">
                  <h3>{product.name || "NA"}</h3>
                  <p>{product.category || "NA"}</p>
                  <strong><Amount amount={product.price || "NA"}/>/-</strong>
                </div>
              </NavLink>
              {/* <div className="btns">
                <button type="button" className="btn-add">
                  Add to cart
                </button>
                <button type="button" className="btn-buy">
                  Buy
                </button>
              </div> */}
            </ProductCard>
          ))}
        </ProductList>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 20px auto;
  a {
    text-decoration: none;
  }
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-height: 90vh;
  overflow-y: auto;
  padding:1rem 2rem;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #678a7b;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  @media (max-width: 1024px) {
    max-height: 70vh;
  }
`;

const ProductCard = styled.div`
  border-top: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensure content is evenly spaced */
  height: 300px; /* Set a fixed height for uniformity */

  &:hover {
    transform: translateY(-5px);
  }

  .image {
    img {
      max-width: 150px;
      max-height: 150px;
      // height: auto;
      border-radius: 8px;
    }
  }

  .image-name {
    flex: 1; /* Allow flexibility */
    h3 {
      font-size: 1.2em;
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: black;
    }

    p {
      margin: 5px 0;
      color: #34195e;
    }

    strong {
      color: rgb(53, 95, 77);
      font-weight: bold;
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  button {
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
  }

  .btn-add {
    background-color: rgb(49, 70, 94);

    &:hover {
      background-color: rgb(26, 45, 74);
    }
  }

  .btn-buy {
    background-color: #254336;

    &:hover {
      background-color: rgb(23, 98, 42);
    }
  }
`;

export default ProductGrid;
