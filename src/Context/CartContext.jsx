import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext()


export const CartProvider = ({children})=>{
    const [cart, setCart] = useState([]);
    const {URL,Authenticated}=useAuth()
  const [isAuthenticated,setIsAuthenticated]=useState(false)
useEffect(() => {
    setIsAuthenticated(Authenticated);
    const checkAuth = localStorage.getItem("isLoggedIn");
    // console.log(checkAuth);
    setIsAuthenticated(JSON.parse(checkAuth));
  }, []);

    const createCart = async({id,qut})=>{
      const res = await fetch(`${URL}/cart/add-cart`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({"product_id":id, "quantity":qut}),
        credentials:"include",
      })
      const result = await res.json()
      console.log(result);
      if (result.statusCode === 201) {
        fetchCart()
      return { success: true, data: result };
      
      }
    }
const fetchCart = async () => {
    const res = await fetch(`${URL}/cart/get-cart`, {
      method: "GET",
      credentials: "include",
    });
    const result = await res.json();
    // console.log(result.data);
    if (result.statusCode === 200) {
      setCart(result.data);
    }else{
      return null
    }
  };

  
  const removeItem = async(id)=>{
    const res = await fetch(`${URL}/cart/remove-item`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({"product_id":id}),
        credentials:"include"
    })
    const result = await res.json()
    if (res.ok) {
        fetchCart()
        return { success: true, data: result };
    }
  }

  const handleQuantity = async(id,state = "increment")=>{
    const action = state === "increment" ? "increment" : "decrement";
    console.log(id,action);
    
    const res = await fetch(`${URL}/cart/update-quantity`,{
      method:"PATCH",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({"product_id":id , "action":action}),
      credentials:"include"
  })
  const result = await res.json()
    if (res.ok) {
        fetchCart()
        return { success: true, data: result };
    }
  }
    return(
        <CartContext.Provider value={{cart,removeItem,fetchCart,createCart,handleQuantity}}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart = ()=>useContext(CartContext)