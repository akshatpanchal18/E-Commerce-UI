import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { URL } = useAuth();
  const [order, setOrders] = useState([]);

  const createOrder = async (id,type) => {

    console.log("createOrder -> id:", id, "type:", type);
    
    const res = await fetch(`${URL}/order/create-order`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({"checkout_id":id,"paymentType":type}),
      credentials: "include",
    });
    const result = await res.json()
    console.log(result);
    if(result.statusCode === 201){
      return({success:true,data:result})
    }
    

  };
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${URL}/order/get-orders`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (result.statusCode === 200) {
        console.log(result);
        return ({success:true ,data:result})
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };
  return <OrderContext.Provider value={{createOrder,fetchHistory}}>{children}</OrderContext.Provider>;
};

export const useOrder = () => useContext(OrderContext);
