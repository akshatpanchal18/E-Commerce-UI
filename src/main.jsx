import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { CheckoutProvider } from "./Context/CheckOutContext.jsx";
import { OrderProvider } from "./Context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <CheckoutProvider>
            <OrderProvider>
            <App />
            </OrderProvider>
          </CheckoutProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
