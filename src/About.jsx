import React from 'react';
import styled from 'styled-components';

const AboutUs = () => {
    return (
        <AboutContainer>
            <AboutContent>
                <h1>About Us</h1>
                <p>
                    Welcome to EchoBazaar! We are dedicated to providing the best products 
                    at the most affordable prices. Our mission is to ensure customer 
                    satisfaction by offering a wide variety of high-quality items that 
                    cater to your needs.
                </p>
                <p>
                    Our team is passionate about what we do and continuously strives to 
                    improve our offerings. We believe in building a strong relationship 
                    with our customers and are always here to assist you with any 
                    inquiries.
                </p>
                <p>
                    Thank you for choosing EchoBazaar. We look forward to serving you and 
                    providing an exceptional shopping experience!
                </p>
            </AboutContent>
            {/* <AboutImage src="https://via.placeholder.com/600x400" alt="About Us" /> */}
        </AboutContainer>
    );
};

const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9; /* Light background for contrast */
`;

const AboutContent = styled.div`
    max-width: 800px;
    text-align: center;

    h1 {
        margin-bottom: 1rem;
        font-size: 2.5rem;
        color: #254336; /* Main color */
    }

    p {
        font-size: 1.2rem;
        line-height: 1.5;
        margin-bottom: 1rem;
        color: #555; /* Darker text color for readability */
    }
`;

const AboutImage = styled.img`
    width: 100%;
    max-width: 600px; /* Limit the image size */
    height: auto; /* Maintain aspect ratio */
    margin-top: 2rem; /* Space between text and image */
`;

export default AboutUs;
