import React from "react";
import styled from "styled-components";

const ContactUs = () => {
  return (
    <ContactWrapper>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>
          Have questions or need help? Fill out the form below or reach us
          through our contact details.
        </p>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Email: support@echobazaar.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Commerce St, Shopville, USA</p>
          </div>
          <div className="contact-form">
            <form>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Write your message"
                rows="5"
                required
              ></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </ContactWrapper>
  );
};

const ContactWrapper = styled.div`
  padding: 30px 20px;
  background-color: #f2fcf8;
  min-height: 100vh;

  .contact-container {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 20px;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  .contact-info {
    text-align: left;
  }

  .contact-info h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .contact-info p {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
  }

  .contact-form form {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 0.9rem;
    color: #333;
  }

  input,
  textarea {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  textarea {
    resize: none;
  }

  button {
    padding: 10px 15px;
    font-size: 1rem;
    color: #fff;
    background-color: #254336;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color:#3b6f59;
  }

  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default ContactUs;
