import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const CheckOutContext = createContext()

export const CheckoutProvider = ({children})=>{
    const {URL}=useAuth()
    const [checkOutData,setCheckOutData]=useState([])

    const createCheckOut = async(cartData)=>{
        console.log(cartData);
        let items;
    
    try {
        if (Array.isArray(cartData) && cartData.length > 0) {
            items = cartData; // Use the entire array
        } else if (cartData && typeof cartData === 'object') {
            items = [cartData]; // Wrap single item in an array
        } else {
            console.log("No valid data to checkout.");
            return; // Exit if there's no valid data
        }
        const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0)
        console.log(items,totalPrice);
        
            
            const res = await fetch(`${URL}/checkout/check-out`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({"items":items ,"total":totalPrice}),
                credentials:"include"
            })
            const result = await res.json()
            console.log(result);
            if (result.statusCode === 201) {
                setCheckOutData(result.data)
            }
            console.log(checkOutData);
    } catch (error) {
        console.log(error);
        
    }
    }

    return (
        <CheckOutContext.Provider value={{createCheckOut,checkOutData}}>
            {children}
        </CheckOutContext.Provider>
    )
}
export const useCheckout =()=> useContext(CheckOutContext)