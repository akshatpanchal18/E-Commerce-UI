import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Carousel from "./Carousel";

const carouselItems = [
  {
    image: "https://res.cloudinary.com/dg8cwbkdy/image/upload/v1735043898/products/Pramotions/vrgzbfc9pwmvcouxi1ry.jpg",
    overlayText: "New Launch up to 10% off",
  },
  {
    image: "https://res.cloudinary.com/dg8cwbkdy/image/upload/v1735043962/products/Pramotions/j2pkamg8rtq7iog4p8z8.jpg",
    overlayText: "Explore Amazing Products",
  },
  {
    image: "https://res.cloudinary.com/dg8cwbkdy/image/upload/v1735044100/products/Pramotions/fyqjk6wgxdomruheleck.jpg",
    overlayText: "Shop Now and Save Big!",
  },
];


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroContainer>
      <Container>
        <h1>Welcome To EchoBazaar</h1>
        <Button>Shop now</Button>
      </Container>
      <Carousel carouselItems={carouselItems}/>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  text-align: center;
  margin: 1rem auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    margin: 0.5rem auto;
  }
`;

const Container = styled.div`
  background-color: #ebfaf2;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: url("https://res.cloudinary.com/dg8cwbkdy/image/upload/v1735804272/products/Pramotions/lfnb6nagreh7ej4ptun3.jpg") no-repeat center center;
  background-size: contain; /* Change to 'contain' if you want the entire image to fit */
  background-attachment: fixed;
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;


const Button = styled.button`
  padding: 0.8rem;
  border: none;
  outline: none;
  background: #254336;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  cursor:pointer;
  &:hover{
  background:rgba(37,67,54,0.9);
  }

  @media (max-width: 768px) {
    padding: 0.6rem; /* Adjust padding for smaller screens */
    font-size: 1rem; /* Adjust font size for smaller screens */
  }
`;


export default HeroSection;
