import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserAlt, FaUserAltSlash } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "./Context/AuthContext";
import { useCart } from "./Context/CartContext";

function Navbar() {
  const {Authenticated}=useAuth()
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cart ,fetchCart} = useCart();
const [cartCount, setCartCount] = useState(0);
useEffect(() => {
  if (isAuthenticated) {
    const fetchUserCart = async () => {
      await fetchCart(); // Ensure fetchCart is called here
    };
    fetchUserCart();
  }
}, [isAuthenticated]);

// Update cartCount whenever cart changes
useEffect(() => {
  setCartCount(cart.items?.length || 0);
}, [cart]);


  useEffect(()=>{
    setIsAuthenticated(Authenticated);
    const checkAuth = localStorage.getItem("isLoggedIn")
    // console.log(checkAuth);
    setIsAuthenticated(JSON.parse(checkAuth))
  },[Authenticated])
  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <Nav>
      <div className="navbar">
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobile ? <>&#10005;</> : <>&#9776;</>}
        </button>

        <div className="navbar-logo">
          {/* <img src="https://res.cloudinary.com/dg8cwbkdy/image/upload/v1735725041/c1ydkqvqinddmgboistl.png" alt="" /> */}
          <h1>EchoBazaar</h1>
        </div>
        <ul
          className={isMobile ? "navbar-links-mobile open" : "navbar-links"}
          onClick={() => setIsMobile(false)}
        >
          <li>
            <NavLink to="/" activeclassname="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" activeclassname="active">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" activeclassname="active">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeclassname="active">
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="navbar-icons">
          <div className="cart-container">
            <NavLink to="/cart">
              <AiOutlineShoppingCart className="cart" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </NavLink>
          </div>
          {isAuthenticated ? (
            <NavLink to="/user-profile">
                <FaRegUserCircle className="user" />
            </NavLink>
          ) : (
            <NavLink to="/login">
              <FaUserAltSlash className="user" />
            </NavLink>
          )}
        </div>
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    background-color: #254336;
    color: #fff;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  }

  .navbar-logo {
    flex: 1;
    text-align: left;
  }

  .navbar-logo h1 {
    font-size: 1.5rem;
    // color: #c6ac8f;
  }
    .navbar-logo img{
    width:70px;
    object-fit:contain;
    }

  .navbar-links {
    display: flex;
    list-style: none;
  }

  .navbar-links li {
    margin: 0 1rem;
  }

  .navbar-links a {
    // color: #fff;
    color: #6b8a7a;
    font-size: 1.5rem;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .navbar-links a:hover,
  .navbar-links a.active {
    font-weight: bold;
    // color:#6B8A7A;
    color: #fff;
  }

  .navbar-icons {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-left: 10px;
  }

  .cart-container {
    position: relative;
  }

  .cart {
    font-size: 2rem;
    color: #fff;
    position: relative;
  }

  .cart-count {
    position: absolute;
    top: -8px;
    right: -10px;
    background: red;
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .user {
    font-size: 1.9rem;
    color: #fff;
  }
  .mobile-menu-icon {
    display: none;
    font-size: 2rem;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    z-index: 1001;
  }

  /* Mobile view adjustments */
  @media (max-width: 768px) {
    .navbar {
      padding: 1rem 2rem;
      display: flex;
      place-items: center;
    }

    .mobile-menu-icon {
      display: block;
      flex: 0 0 auto;
    }

    .navbar-logo {
      flex: 1;
      text-align: center;
    }

    .navbar-icons {
      flex: 0 0 auto;
      font-size: 1.7rem;
    }

    .navbar-links {
      display: none;
    }

    .navbar-links-mobile {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 50%;
      // background-color: #333;
      background-color: #254336;
      padding-top: 3rem;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      z-index: 1000;
      list-style: none;
    }

    .navbar-links-mobile li {
      margin: 1.5rem 0;
      text-align: center;
    }

    .navbar-links-mobile a {
      color: #fff;
      font-size: 1.2rem;
      text-decoration: none;
    }

    .navbar-links-mobile.open {
      transform: translateX(0);
    }
  }
`;

export default Navbar;
