import React, { useEffect, useState } from "react";
import { useProduct } from "../Context/ProductContext";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import {
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import Counter from "../Helpers/Counter";
import Rating from "../Helpers/Rating";
import Reviews from "./Reviews";
import OrderSummary from "./OrderSummury";
import Popup from "../Helpers/Popup";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import Amount from "../Helpers/Amount";

function SingleProduct() {
  const {URL,Authenticated} = useAuth()
  const {createCart}=useCart()
  const {ProductDetails}=useProduct()
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
const [product,setProduct]= useState(null)
  // console.log(count);

  // Use find directly to locate the product based on the id
  // const product = products.find((item) => item._id === id); // Assuming id is a string
 useEffect(() => {
    setIsAuthenticated(Authenticated);
    const checkAuth = localStorage.getItem("isLoggedIn");
    // console.log(checkAuth);
    setIsAuthenticated(JSON.parse(checkAuth));
  }, []);
useEffect(()=>{
  ProductDetails(id).then((res)=>{
if(res.success){
  // console.log(res.data);
  setProduct(res.data)
}
  })
},[])
  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }
  const handleCart = async ({ id, qut }) => {
    console.log("ProductId:", id);
    console.log("Quantity", qut);
    if (isAuthenticated === true) {
     createCart({id,qut}).then((res)=>{
      if (res.success) {
        setPopupMessage("Product added to cart");
      setShowPopup(true);
      
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      }
     })
    }
    else{
      alert("Please Loging to Procced")
    }
    
  };
  const handleBuy = async ({ product, qut }) => {
    if (isAuthenticated === true) {
      setQuantity(qut);
    setSelectedProduct(product);
    setShowSummary(true);
    }
    else{
      alert("Please Loging to Procced")
    }
  };
const handleClose = ()=>{
  setShowSummary(false)
}
  return (
    <>
      {showSummary ? (
        <>
        <OrderSummary product={selectedProduct} quantity={quantity} onClose={handleClose}/>
        </>
      ) : (
        <>
          <Container>
          {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
            <NavLink to="/products">
              <FaArrowLeft />
            </NavLink>
            <ImageContainer>
              <img src={product.image} alt={product.name} />
            </ImageContainer>
            <Content>
              <Data>
                <h2>{product.name}</h2>
                <strong><Amount amount={product.price}/>/-</strong>
                <p>{product.description}</p>
                <p>
                  Brand:<strong>{product.brand}</strong>
                </p>
                <p>
                  Category:<strong>{product.category}</strong>
                </p>
                <p>
                  Reviwes:<strong>{product.numReviews}</strong>
                </p>
                <div className="p">
                  Rating:
                  <Rating rating={product.rating} />
                </div>
              </Data>
              <IconContainer>
                <span>
                  <FaTruckFast /> Delivery
                </span>
                <span>
                  <FaUndoAlt /> Returnable
                </span>
                <span>
                  <FaShieldAlt /> Warranty
                </span>
                <span>
                  <FaLock /> Secured
                </span>
              </IconContainer>
              <Counter count={count} setCount={setCount} />
              <ButtonContainer>
                <button
                  className="add"
                  type="button"
                  onClick={() => handleCart({ id: product._id, qut: count })}
                >
                  Add to Cart
                </button>
                <button
                  className="buy"
                  type="button"
                  onClick={() => handleBuy({ product: product, qut: count })}
                >
                  Buy Now
                </button>
              </ButtonContainer>
            </Content>
          </Container>
          <Reviews review={product.reviews} id={product._id} />
          
        </>
      )}
      
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  // border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  a {
    color: black;
    font-size: 1.7rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;

  img {
    width: 100%;
    max-width: 500px;
    margin: 3rem auto;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      margin: 0;
      max-height: 300px;
      object-fit: contain;
    }
    @media (max-width: 768px) {
      padding: 0 3rem;
    }
  }
`;

const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const Data = styled.div`
  h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }

  strong {
    font-size: 18px;
    color: #555;
  }

  p,
  .p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #777;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #36635e;
    }
  }
  .buy {
    background-color: #254336;
  }
  .add {
    background: #46735f;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }
`;

export default SingleProduct;
