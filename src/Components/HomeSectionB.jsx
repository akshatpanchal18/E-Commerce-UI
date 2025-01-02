import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
import { FaTruck, FaLock, FaUndoAlt, FaHeadset , FaStar, FaStarHalfAlt} from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const HomeSectionB = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const promotions = [
    {
      image: 'http://res.cloudinary.com/dg8cwbkdy/image/upload/v1735044893/products/dmq3svsluofylywcoop4.jpg',
      description: 'Exclusive Watch Collection',
      discount: '20% Off',
    },
    {
      image: 'http://res.cloudinary.com/dg8cwbkdy/image/upload/v1735045093/products/kf37ru6upjgdp3mzfdbc.webp',
      description: 'Latest Headphones',
      discount: '30% Off',
    },
    {
      image: 'http://res.cloudinary.com/dg8cwbkdy/image/upload/v1735045221/products/kg7acaszizy4w3qoboto.webp',
      description: 'Premium Fragrances',
      discount: '15% Off',
    },
  ];
  const lunchItems = [
    {
      image: 'https://m.media-amazon.com/images/I/61cdve+mxjL.jpg',
      description: 'Smart Home Assistant Lamp',
      discount: '10% Off on pre-order',
    },
    {
      image: 'https://brownliving.in/cdn/shop/products/bamboo-stainless-steel-bottle-vaccum-insulated-double-wall-hot-cold-500ml-sustainable-products-on-brown-living-247182_600x.jpg?v=1688224999',
      description: 'Eco-Friendly Fitness Bottle',
      discount: 'Free custom engraving',
    },
    {
      image: 'https://m.media-amazon.com/images/I/71+BHZtdFaL.jpg',
      description: 'Compact Cordless Vacuum Cleaner',
      discount: 'get a cleaning attachment kit free',
    },
  ];
  const carouselItems = [
    {
      image: "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      overlayText: "New Launch up to 10% off",
    },
    {
      image: "https://media.istockphoto.com/id/1941360741/photo/woman-hands-packing-beige-shoes-on-heels-into-plastic-box-for-comfortable-storage-organize.jpg?s=2048x2048&w=is&k=20&c=BTnfDN8M_IwutzO2YgWWy7SCdKmDNTYjljt1kPQdEdo=",
      overlayText: "Explore Amazing New Shoes",
    },
    {
      image: "https://www.91-cdn.com/hub/wp-content/uploads/2024/11/Vivo-X200-Pro-.jpg?tr=w-781",
      overlayText: "Coming Soon ...",
    },
  ];
  const testimonials = [
    {
      name: "Alice Johnson",
      rating: 4.5,
      feedback:
        "The products are amazing! Delivery was quick, and the quality exceeded my expectations.",
    },
    {
      name: "Michael Brown",
      rating: 5,
      feedback:
        "Superb customer service. I’m impressed with the secure payment process and the 7-day return policy.",
    },
    {
      name: "Sophie Turner",
      rating: 4,
      feedback:
        "Great shopping experience. The prices are fair, and the discounts are worth it!",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [testimonials.length]);

  return (
    <>
    <GridContainer>
      <h2>Special Offers</h2>
      <Grid>
        {promotions.map((promo, index) => (
          <PromotionCard key={index}>
            <ImageContainer>
              <img src={promo.image} alt="Product" />
            </ImageContainer>
            <Content>
              <h3>{promo.description}</h3>
              <h3 style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                {promo.discount}
              </h3>
            </Content>
          </PromotionCard>
        ))}
      </Grid>
    </GridContainer>
    <Carousel carouselItems={carouselItems}/>
    <GridContainer>
    <h2>Upcomming Products</h2>
    <Grid>
      {lunchItems.map((item, index) => (
        <PromotionCard key={index}>
          <ImageContainer>
            <img src={item.image} alt="Lunch Special" />
          </ImageContainer>
          <Content>
            <h3>{item.description}</h3>
            <h3 style={{ color: '#e74c3c', fontWeight: 'bold' }}>
              {item.discount}
            </h3>
          </Content>
        </PromotionCard>
      ))}
    </Grid>
  </GridContainer>
  <CustomerWrapper>
      <h2>What Our Customers Say</h2>
      <div className="response-card">
        <h3>{testimonials[currentIndex].name}</h3>
        <div className="rating">
          {Array(Math.floor(testimonials[currentIndex].rating))
            .fill(0)
            .map((_, i) => (
              <FaStar key={i} className="star" />
            ))}
          {testimonials[currentIndex].rating % 1 !== 0 && <FaStarHalfAlt className="star" />}
        </div>
        <p>{testimonials[currentIndex].feedback}</p>
      </div>
      <div className="response-grid">
        {testimonials.map((_, index) => (
          <div className={`dot ${index === currentIndex ? "active" : ""}`} key={index} />
        ))}
      </div>
    </CustomerWrapper>
  <ServicesWrapper>
      <h2>Why Shop With Us?</h2>
      <div className="services-grid">
        <div className="service-item">
          <FaTruckFast className="icon" />
          <h3>Free Delivery</h3>
          <p>Get free delivery on all orders over  ₹ 500.</p>
        </div>
        <div className="service-item">
          <FaLock className="icon" />
          <h3>Secure Payment</h3>
          <p>100% secure payment gateway for peace of mind.</p>
        </div>
        <div className="service-item">
          <FaUndoAlt className="icon" />
          <h3>7 Days Return</h3>
          <p>Easy returns within 7 days for hassle-free shopping.</p>
        </div>
        <div className="service-item">
          <FaHeadset className="icon" />
          <h3>24/7 Support</h3>
          <p>Our customer support team is here for you anytime.</p>
        </div>
      </div>
    </ServicesWrapper>
    <SubscribeWrapper>
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay updated with the latest deals, products, and offers!</p>
      <form className="subscribe-form">
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Subscribe</button>
      </form>
    </SubscribeWrapper>
  </>
  );
};

const GridContainer = styled.div`
  padding: 20px;
//   background-color: #f8f8f8;
  background-color: #e7fce3;
  max-width:1200px;
  margin:1rem auto;
border-radius: 10px;
  h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack columns on smaller screens */
  }
`;

const PromotionCard = styled.div`
  background: #fff;
//   border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
// box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Content = styled.div`
  padding: 15px;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
  }
`;
const CustomerWrapper = styled.div`
  padding: 20px;
  background-color: #ebfaf2;
  text-align: center;
max-width:1000px;
margin:1rem auto;
border-radius: 10px;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
  }

  .response-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 10px;
  }

  .response-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: left;
    transition: transform 0.3s ease;
    max-width:500px;
margin:1rem auto;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      font-size: 1.5rem;
    //   color: #007bff;
      color: #254336;
      margin-bottom: 10px;
    }

    .rating {
      display: flex;
      margin-bottom: 10px;

      .star {
        color: #f9a825;
        margin-right: 2px;
        font-size: 1.2rem;
      }
    }

    p {
      font-size: 1rem;
      color: #555;
    }
  }

  @media (max-width: 768px) {
    .response-grid {
      grid-template-columns: 1fr;
    }

    .response-card {
      padding: 15px;
    }
  }
`;
const ServicesWrapper = styled.div`
  padding: 20px;
  background-color: #e3f6fc;
  text-align: center;
max-width:1200px;
margin:1rem auto;
border-radius: 10px;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 10px;
  }

  .service-item {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .icon {
      font-size: 2rem;
      // color: #254336;
      color: #02b8fa;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #333;
    }

    p {
      font-size: 1rem;
      color: #555;
    }
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }

    .service-item {
      padding: 15px;
    }
  }
`;
const SubscribeWrapper = styled.div`
  padding: 30px 20px;
  background-color: #f7f7f7;
  text-align: center;
  border-radius: 8px;
  max-width:800px;
  margin: 20px auto;

  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 20px;
  }

  .subscribe-form {
    display: flex;
    justify-content: center;
    gap: 10px;

    input {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 250px;
    }

    button {
      padding: 10px 20px;
      font-size: 1rem;
      color: #fff;
      background-color: #6B8A7A;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color:rgb(41, 72, 56);
    }
  }

  @media (max-width: 768px) {
    .subscribe-form {
      flex-direction: column;

      input {
        width: 100%;
        margin-bottom: 10px;
      }

      button {
        width: 100%;
      }
    }
  }
`;

export default HomeSectionB;
