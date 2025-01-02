import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Carousel({carouselItems}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <CarouselContainer>
      <SlideContainer
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item, index) => (
          <Slide key={index}>
            <img src={item.image} alt={`Slide ${index + 1}`} />
            <Overlay>
              <OverlayText>{item.overlayText}</OverlayText>
            </Overlay>
          </Slide>
        ))}
      </SlideContainer>
    </CarouselContainer>
  );
}

export const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden; /* Hide overflow to create a clean effect */
  width: 100%;
  max-width: 1000px; /* Set a maximum width for the carousel */
  margin: 1rem auto; /* Center the carousel */
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 100%; /* Make carousel full-width on small screens */
    margin: 0.5rem auto; /* Adjust margin for smaller screens */
    border-radius: 0;
  }
`;

export const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out; /* Smooth transition */
  width: 100%;
`;

export const Slide = styled.div`
  min-width: 100%; /* Each slide takes full width */
  position: relative;

  img {
    width: 100%;
    height: auto; /* Allow the height to be automatic */
    max-height: 300px; /* Set a max height for the images */
    object-fit: cover; /* Maintain aspect ratio */

    @media (max-width: 768px) {
      max-height: 200px; /* Reduce max height for smaller screens */
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  color: #ffffff;
  text-align: center;
  padding: 1rem; /* Padding for better text spacing */

  @media (max-width: 768px) {
    padding: 0.5rem; /* Adjust padding for smaller screens */
  }
`;

export const OverlayText = styled.h2`
  font-size: 2rem; /* Title size */
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Adjust font size for smaller screens */
  }
`;

export default Carousel;
