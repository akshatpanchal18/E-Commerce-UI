import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-scroll';

function Footer() {
    return (
        <FooterContainer>
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>We are dedicated to providing the best products at the most affordable prices. Customer satisfaction is our top priority.</p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
                        <li><Link to="products" smooth={true} duration={500}>Products</Link></li>
                        <li><Link to="about" smooth={true} duration={500}>About Us</Link></li>
                        <li><Link to="contact" smooth={true} duration={500}>Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: support@echobazaar.com</p>
                    <p>Phone: +1 234 567 890</p>
                    <div className="social-icons">
                        <a href="https://facebook.com"><FaFacebook /></a>
                        <a href="https://twitter.com"><FaTwitter /></a>
                        <a href="https://instagram.com"><FaInstagram /></a>
                        <a href="https://linkedin.com"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 EchoBazaar. All rights reserved.</p>
            </div>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    background-color: #254336;
    color: #ffffff;
    padding: 2rem 4rem;

    .footer-content {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        max-width: 1200px; /* Set a max width */
        margin: 0 auto; /* Center the content */
    }

    .footer-section {
        flex: 1;
        min-width: 250px; /* Set a minimum width */
        margin: 1rem; /* Add some spacing */
    }
    
    h2 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: #c6ac8f;
    }

    p {
        font-size: 1rem;
        line-height: 1.5;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    ul li {
        margin-bottom: 0.5rem;
    }

    ul li a {
        color: #ffffff;
        text-decoration: none;
        transition: color 0.3s;
        cursor: pointer;
    }

    ul li a:hover {
        color: #c6ac8f;
    }

    .social-icons {
        margin-top: 1rem;
        display: flex;
        gap: 1rem;
    }

    .social-icons a {
        font-size: 1.5rem;
        color: #ffffff;
        transition: color 0.3s;
    }

    .social-icons a:hover {
        color: #c6ac8f;
    }

    .footer-bottom {
        text-align: center;
        margin-top: 2rem;
        font-size: 1rem;
        border-top: 1px solid #c6ac8f;
        padding-top: 1rem;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
        padding: 1rem 2rem;

        .footer-content {
            flex-direction: column;
            align-items: center;
        }

        .footer-section {
            width: 100%;
            text-align: center;
        }

        .social-icons {
            justify-content: center;
        }
    }
`;

export default Footer;
