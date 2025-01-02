import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Amount from "../Helpers/Amount";

const Receipt = ({ order }) => {
  console.log(order.data);
  const [isOrder, setIsOrder] = useState({});

  useEffect(() => {
    if (order && order.data) {
      setIsOrder(order.data);
    }
  }, [order]);

  return (
    <OrderContainer>
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed. Here are the details:</p>
      <OrderDetails>
        <h2>Order ID: {isOrder._id}</h2>
        <ItemsList>
          {isOrder.items && isOrder.items.length > 0 ? (
            isOrder.items.map((item) => (
              <Item key={item.productId._id}>
                <img src={item.productId.image} alt={item.productId.name} />
                <ItemDetails>
                  <h3>{item.productId.name}</h3>
                  <p>Price: {item.price.toFixed(2)}/-</p>
                  <p>Quantity: {item.quantity}</p>
                </ItemDetails>
              </Item>
            ))
          ) : (
            <p>No items in this order.</p>
          )}
        </ItemsList>
        <TotalAmount>
          {/* <h2>Total Amount Paid: {isOrder.totalAmount ? isOrder.totalAmount.toFixed(2) : 0}/-</h2> */}
          <h3>Total Amount Paid: <Amount amount={isOrder.totalAmount}/></h3>
        </TotalAmount>
      </OrderDetails>
      <h2>Shipping Address</h2>
      <ItemDetails>
        {isOrder.shippingAddress ? (
          <>
            {isOrder.shippingAddress.address},<br/> {isOrder.shippingAddress.city},<br/> {isOrder.shippingAddress.zip_code}
          </>
        ) : (
          <p>No shipping address provided.</p>
        )}
      </ItemDetails>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  h1 {
    color: #2c3e50;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const OrderDetails = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 2rem;
  padding-top: 2rem;
`;

const ItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  img {
    width: 100px;
    height: auto;
    margin-right: 1rem;
  }
`;

const ItemDetails = styled.div`
  text-align: left;

  h3 {
    margin: 0 0 0.5rem;
  }
`;

const TotalAmount = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #27ae60;
`;

export default Receipt;
