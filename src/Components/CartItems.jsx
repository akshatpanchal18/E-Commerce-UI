import React, { useEffect, useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import Popup from "../Helpers/Popup";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { useCheckout } from "../Context/CheckOutContext";
import Amount from "../Helpers/Amount";

const CartPage = () => {
  const { Authenticated,Currentuser } = useAuth();
  const { cart, removeItem, fetchCart, handleQuantity } = useCart();
  const {createCheckOut}=useCheckout()
  const [user, setUser] = useState(null); // Example address
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [itemCounts, setItemCounts] = useState({});
  useEffect(() => {
    setIsAuthenticated(Authenticated);
    const checkAuth = localStorage.getItem("isLoggedIn");
    // console.log(checkAuth);
    setIsAuthenticated(JSON.parse(checkAuth));
  }, []);
  useEffect(() => {
    if(isAuthenticated){
      Currentuser().then((res)=>{
        if (res.success) {
          setUser(res.data);
        }
      })
    fetchCart();
  }
  }, [isAuthenticated]);
  useEffect(() => {
    // Initialize item counts based on cart items
    if (cart.items) {
      const counts = {};
      cart.items.forEach((item) => {
        counts[item.productId._id] = item.quantity; // Set initial count for each item
      });
      setItemCounts(counts);
    }
  }, [cart.items]);
  const handleRemoveItem = (id) => {
    console.log(id);
    removeItem(id).then((response) => {
      if (response.success) {
        setPopupMessage("Item Removed");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    });
  };
  const handleInc = (id) => {
    handleQuantity(id, "increment").then((res) => {
      if (res.success) {
        setItemCounts((prevCounts) => ({
          ...prevCounts,
          [id]: (prevCounts[id] || 0) + 1, // Increment the count for the specific item
        }));
      }
    });
  };

  const handleDec = (id) => {
    // Get the current count for the item
    const currentCount = itemCounts[id] || 1;
  
    // Check if the current count is 1
    if (currentCount <= 1) {
      // Show popup message if the quantity cannot be decremented below 1
      setPopupMessage('Cannot decrement below 1');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } else {
      // Proceed with decrementing the quantity
      handleQuantity(id, "decrement").then((res) => {
        if (res.success) {
          setItemCounts((prevCounts) => ({
            ...prevCounts,
            [id]: currentCount - 1, // Decrement the count
          }));
        } else {
          // Handle error case from the server response
          setPopupMessage('Error updating quantity');
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        }
      });
    }
  };
  const handleCheckout = () => {
    // console.log(cart);
    createCheckOut(cart)
  };
  
  const name = user
    ? `${user.userInfo.first_name} ${user.userInfo.last_name}`
    : "Guest";
  const address = user
    ? `${user.user_address.address}, ${user.user_address.city}`
    : "Not Available";

  return isAuthenticated ? (
    <Container>
      <CartItems>
        <NavLink to="/products">
          <FaArrowLeft className="icon" />
        </NavLink>
        <h2>Your Shopping Cart</h2>
        {showPopup ? (
          <>
            <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
          </>
        ) : null}

        <ItemsList>
          {cart.items && cart.items.length > 0 ? (
            cart.items.map((item) => (
              <CartItem key={item.productId._id}>
                <ItemImage src={item.productId.image} alt="Item" />
                <ItemDetails>
                  <ItemName>{item.productId.name}</ItemName>
                  <ItemQuantity>Qut: {item.quantity}</ItemQuantity>
                  <ItemPrice><Amount amount={item.productId.price}/></ItemPrice>
                </ItemDetails>
                {/* <Counter count={count} setCount={setCount} /> */}
                <CounterContainer>
                  <FaMinus onClick={() => handleDec(item.productId._id)} />
                  <p style={{color:"#254336",fontWeight:"bold"}}>{itemCounts[item.productId._id] || item.quantity}</p>
                  <FaPlus onClick={() => handleInc(item.productId._id)} />
                </CounterContainer>
                <RemoveButton
                  onClick={() => handleRemoveItem({ id: item.productId._id })}
                >
                  <MdDeleteForever />
                </RemoveButton>
              </CartItem>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </ItemsList>

        <Divider />
        <TotalAmount>
          <span>Total Amount:</span>
          <strong><Amount amount={cart.totalPrice}/></strong>
        </TotalAmount>
      </CartItems>
      <Summary>
        <AddressSection>
          <AddressLabel>Shipping Address:</AddressLabel>
          <AddressText>{name}</AddressText>
          <AddressText>
            +91 {user?.userInfo?.contact_no || "Not Available"}
          </AddressText>
          <AddressText>{address}</AddressText>
          <AddressText>
            {user?.user_address?.zip_code || "Not Available"}
          </AddressText>
        </AddressSection>
        <SummaryHeader>Order Summary</SummaryHeader>
        <SummaryDetails>
          <p>
            Total Items: <strong>{cart.items ? cart.items.length : 0}</strong>
          </p>

          <p>
            Total Price: <strong><Amount amount={cart.totalPrice}/></strong>
          </p>
        </SummaryDetails>
        <GiftCodeContainer>
          <GiftCodeInput type="text" placeholder="Enter gift code" />
          <ApplyCodeButton>Apply</ApplyCodeButton>
        </GiftCodeContainer>
        <CheckoutButton onClick={handleCheckout}>
          <NavLink to="/check-out" >Proceed to Checkout</NavLink>
        </CheckoutButton>
      </Summary>
    </Container>
  ) : (
    <Alert>
      Please Login to proceed{" "}
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
    </Alert>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Stack on small screens */
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  max-width: 1000px;
  margin: 0 auto;
  overflow-x: hidden; /* Prevent horizontal scrolling */
  .icon {
    font-size: 1.5rem;
    color: #254336;
  }
  @media (min-width: 768px) {
    flex-direction: row; /* Row layout for larger screens */
  }
`;

const CartItems = styled.div`
  flex: 7;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 8px 0;
  // border: 1px solid #ddd;
  //  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-right: 8px;
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 16px;

  @media (max-width: 768px) {
    margin-right: 8px;
    text-align: center;
  }
`;

export const ItemName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ItemQuantity = styled.div`
  font-size: 14px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  gap: 10px;

  @media (max-width: 768px) {
    margin-right: 8px;
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #e0e0e0;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px; /* Reduced font size */
  font-weight: bold;
  color: #333;
  padding-top: 10px;
`;

const Summary = styled.div`
  flex: 3;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AddressSection = styled.div`
  margin-bottom: 20px; /* Space between address and order summary */
`;

const AddressLabel = styled.label`
  font-size: 16px; /* Adjusted font size for label */
  margin-bottom: 5px; /* Space below the label */
  display: block; /* Block display for label */
  font-weight: bold;
`;

const AddressText = styled.p`
  font-size: 14px; /* Adjusted font size for address */
  margin: 0; /* Remove default margin */
`;

const SummaryHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 18px; /* Reduced font size */
`;

const SummaryDetails = styled.div`
  font-size: 14px; /* Reduced font size */
  margin-bottom: 20px;

  p {
    margin: 10px 0;

    strong {
      font-weight: bold;
    }
  }
`;

const GiftCodeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const GiftCodeInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 14px; /* Reduced font size */
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ApplyCodeButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(33, 90, 136);
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #254336;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  a {
    text-decoration: none;
    color: white;
    font-size: 16px;
  }

  &:hover {
    background-color: rgb(64, 96, 71);
  }
`;
const Alert = styled.div`
  text-align: center;
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  gap: 20px;

  button {
    border: none;
    padding: 1rem 2rem;
    outline: none;
    max-width: 100px;
    margin: 0.5rem auto;
    border-radius: 10px;
    background: #254336;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;
export default CartPage;
