import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCheckout } from "../Context/CheckOutContext";
import Amount from "../Helpers/Amount";

function OrderSummary({ product, quantity, onClose }) {
  const total = product.price * quantity; // Calculate total price
  const {createCheckOut} = useCheckout();
  
  const item = {
    productId: product._id,
    quantity: quantity,
    price: product.price,
    totalPrice: total,
  };
  const items = [item]
  // console.log(item);
  const handleCheckout = () => {
    createCheckOut(items)
  };
  return (
    <SummaryContainer>
      <BackButton onClick={onClose}>
        <FaArrowLeft /> Back
      </BackButton>
      <h2>Order Summary</h2>
      <ProductContainer>
        <ImageContainer>
          <img src={product.image} alt={product.name} />
        </ImageContainer>
        <DetailsContainer>
          <h3>{product.name}</h3>
          <PriceContainer>
            <p>
              Price: <span><Amount amount={product.price}/></span>
            </p>
            <p>
              Quantity: <span>{quantity}</span>
            </p>
            <Total>
              <strong>Total: </strong>
              <span><Amount amount={total}/></span>
            </Total>
          </PriceContainer>
          <CheckoutButton onClick={handleCheckout}>
            <NavLink to='/check-out'>
              CheckOut
            </NavLink>
          </CheckoutButton>
        </DetailsContainer>
      </ProductContainer>
    </SummaryContainer>
  );
}

// Styled components for styling the Order Summary
const SummaryContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;

  h2 {
    text-align: center;
    color: #333;
  }
`;
const BackButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 15px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff; // Blue color for the back button
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }

  svg {
    margin-right: 5px; // Space between icon and text
  }
`;
const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    max-width: 150px; // Set a max width for the image
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid #ddd; // Add a border around the image
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
      object-fit: contain;
    }
  }
`;

const DetailsContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #555;

  h3 {
    margin: 0 0 10px;
    color: #333;
  }
`;

const PriceContainer = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  line-height: 1.5;

  p {
    margin: 5px 0;

    span {
      font-weight: bold; // Make price and quantity bold
      color: #000; // Black color for emphasis
    }
  }
`;

const Total = styled.p`
  margin-top: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #d9534f; // Bootstrap danger color for total
`;

const CheckoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 1rem;
  color: #fff;
  background-color: #254336; // Green color for the button
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  a {
    text-decoration: none;
    font-size: 1rem;
    color: #fff;
  }
  &:hover {
    background-color: rgb(60, 84, 65); // Darker green on hover
  }
`;

export default OrderSummary;
