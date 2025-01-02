import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import { FormatDate } from "../Helpers/Moment";
import { useAuth } from "../Context/AuthContext";
import Amount from "../Helpers/Amount";

const OrderHistory = ({ onClose }) => {
  const { URL } = useAuth();
  const [orders, setOrders] = useState([]); // Initialize as an empty array

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${URL}/order/get-orders`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (result.statusCode === 200) {
        setOrders(result.data);
        console.log(result);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Container>
      <FaArrowLeft className="icon" onClick={onClose} />
      <h2>Order History</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => {
          const orderStatus = order.orderStatus || "Unknown"; // Fallback if undefined

          return (
            <OrderCard key={index}>
              <OrderHeader $orderStatus={orderStatus}>
                <h3>Order #{index + 1}</h3>
                <small>OrderId: ORD-#{order._id}</small>
                <p>
                  Date: <FormatDate dateString={order.date} />
                </p>
                <p>
                  Status: <span>{orderStatus}</span>
                </p>
                <p>
                  Total Amount: <strong><Amount amount={order.totalAmount}/></strong>
                </p>
              </OrderHeader>
              <OrderItems>
                <h4>Items:</h4>
                {order.items.map((item, itemIndex) => (
                  <Item key={itemIndex}>
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                    />
                    <p>
                      Name: <span>{item.productId.name}</span>
                    </p>
                    <p>
                      Qty: <span>{item.quantity}</span>
                    </p>
                    <p>
                      Price: <span><Amount amount={item.price}/></span>
                    </p>
                  </Item>
                ))}
              </OrderItems>
            </OrderCard>
          );
        })
      ) : (
        <EmptyData>
          <p>No orders found.</p>
        </EmptyData>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  max-height: 70vh;
  min-height: 45vh;
  overflow-y: auto;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .icon {
    font-size: 1.5rem;
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #678a7b;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
`;

const OrderCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const OrderHeader = styled.div`
  margin-bottom: 15px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 5px;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;

    span {
      font-weight: bold;
      color: ${({ $orderStatus }) => {
        if ($orderStatus && $orderStatus.includes("Delivered")) {
          return "green";
        } else if ($orderStatus && $orderStatus.includes("Shipped")) {
          return "orange";
        } else {
          return "red"; // Default color for other statuses
        }
      }};
    }
  }

  strong {
    font-size: 1.1rem;
    color: #000;
  }
`;

const OrderItems = styled.div`
  margin-top: 10px;

  h4 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
`;

const Item = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
  }

  p {
    margin: 5px 0;

    span {
      font-weight: bold;
    }
  }
`;

const EmptyData = styled.div`
  p {
    font-size: 2rem;
    text-align: center;
  }
`;

export default OrderHistory;
