import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import AboutUs from "./About";
import ContactUs from "./ContactUs";
import Products from "./Products";
import AuthPage from "./Components/Login";
import UserProfile from "./Components/UserProfile";
import SingleProduct from "./Components/SingleProduct";
import CartPage from "./Components/CartItems";
import CheckoutPage from "./Components/CheckOut";
import { useAuth } from "./Context/AuthContext";
import { useEffect } from "react";
function App() {
  const {refreshToken}=useAuth()
  // useEffect(() => {
  //   const handleRefresh = async () => {
  //     const success = await refreshToken();
  //     if (!success) {
  //       console.warn("User needs to log in again.");
  //     }
  //   };

  //   handleRefresh();
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/single-product/:id" element={<SingleProduct />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/check-out" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
