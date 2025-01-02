import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCart } from "../Context/CartContext";
import { useCheckout } from "../Context/CheckOutContext";
import { useOrder } from "../Context/OrderContext";
import Receipt from "./Receipt";
import {DotLoader} from './Loaders'
import Amount from "../Helpers/Amount";

const CheckoutPage = () => {
  const { checkOutData } = useCheckout();
  const { createOrder } = useOrder();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  // console.log(selectedPaymentMethod);

  // console.log(checkOutData);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
    setSelectedSubOption(""); // Reset sub-option when changing payment method
  };

  const handleSubOptionChange = (e) => {
    setSelectedSubOption(e.target.value);
  };
  const handleOrder = ({ id, paymentType }) => {
    // setTimeout(() => {
      setLoading(true);
    // }, 4000);
    // console.log("handleOrder -> id:", id, "paymentType:", paymentType);
    createOrder(id, paymentType).then((res) => {
      if (res.success) {
        setLoading(false);
        setShowReceipt(true);
        setOrder(res.data);
      }
    });
  };

  const totalItems = checkOutData.items?.length || 0;
  const orderTotal = checkOutData?.orderTotal || 0;
  // console.log(totalItems,orderTotal);

  return (
    <>
      <CheckoutWrapper>
        {showReceipt ? (
          <Receipt order={order} />
        ) : (
          <>
            <CheckoutHeader>
              <h2>Checkout</h2>
            </CheckoutHeader>
            <OrderSummary>
              <SummaryItem>
                <strong>Total Items:</strong> {totalItems}
              </SummaryItem>
              {checkOutData.items && checkOutData.items.length > 0 ? (
                checkOutData.items.map((item) => {
                  return (
                    <SummaryItem key={item.productId._id}>
                      <strong>Item:</strong>
                      <p>
                        {item.productId.name}({item.quantity})
                      </p>
                    </SummaryItem>
                  );
                })
              ) : (
                <p>No items to Order</p>
              )}
              <SummaryItem>
                <strong>Order Total:</strong> <Amount amount={orderTotal}/>
              </SummaryItem>
            </OrderSummary>
            <h3>Payment Option</h3>
            <PaymentMethodContainer>
              <PaymentMethodLabel>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={selectedPaymentMethod === "UPI"}
                  onChange={handlePaymentMethodChange}
                />
                UPI
              </PaymentMethodLabel>
              {selectedPaymentMethod === "UPI" && (
                <SubOptionContainer>
                  <SubOptionLabel>
                    <input
                      type="radio"
                      name="upiOption"
                      value="GPay"
                      checked={selectedSubOption === "GPay"}
                      onChange={handleSubOptionChange}
                    />
                    Google Pay
                  </SubOptionLabel>
                  <SubOptionLabel>
                    <input
                      type="radio"
                      name="upiOption"
                      value="Paytm"
                      checked={selectedSubOption === "Paytm"}
                      onChange={handleSubOptionChange}
                    />
                    Paytm
                  </SubOptionLabel>
                  <SubOptionLabel>
                    <input
                      type="radio"
                      name="upiOption"
                      value="PhonePe"
                      checked={selectedSubOption === "PhonePe"}
                      onChange={handleSubOptionChange}
                    />
                    PhonePe
                  </SubOptionLabel>
                </SubOptionContainer>
              )}
  
              <PaymentMethodLabel>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Wallet"
                  checked={selectedPaymentMethod === "Wallet"}
                  onChange={handlePaymentMethodChange}
                />
                Wallet
              </PaymentMethodLabel>
              {selectedPaymentMethod === "Wallet" && (
                <SubOptionContainer>
                  <SubOptionLabel>
                    <input
                      type="radio"
                      name="walletOption"
                      value="PayPal"
                      checked={selectedSubOption === "PayPal"}
                      onChange={handleSubOptionChange}
                    />
                    PayPal
                  </SubOptionLabel>
                  <SubOptionLabel>
                    <input
                      type="radio"
                      name="walletOption"
                      value="AmazonPay"
                      checked={selectedSubOption === "AmazonPay"}
                      onChange={handleSubOptionChange}
                    />
                    Amazon Pay
                  </SubOptionLabel>
                </SubOptionContainer>
              )}
  
              <PaymentMethodLabel>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={selectedPaymentMethod === "CARD"}
                  onChange={handlePaymentMethodChange}
                />
                Credit/Debit Card
              </PaymentMethodLabel>
              {selectedPaymentMethod === "CARD" && (
                <CreditCardForm>
                  <FormField>
                    <label>Cardholder Name:</label>
                    <input
                      type="text"
                      placeholder="Enter cardholder name"
                      required
                    />
                  </FormField>
                  <FormField>
                    <label>Card Number:</label>
                    <input
                      type="text"
                      placeholder="Enter card number"
                      maxLength="16"
                      required
                    />
                  </FormField>
                  <FormRow>
                    <FormField>
                      <label>Expiry Date:</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </FormField>
                    <FormField>
                      <label>CVV:</label>
                      <input
                        type="password"
                        placeholder="Enter CVV"
                        maxLength="3"
                        required
                        onChange={handleSubOptionChange}
                      />
                    </FormField>
                  </FormRow>
                </CreditCardForm>
              )}
  
              <PaymentMethodLabel>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={selectedPaymentMethod === "COD"}
                  onChange={handlePaymentMethodChange}
                />
                Cash On Delivery
              </PaymentMethodLabel>
              {selectedPaymentMethod === "COD" && (
                <SubOptionContainer>
                  <SubOptionLabel>
                    <input
                      type="radio"
                      name="codOption"
                      value="COD"
                      checked={selectedSubOption === "COD"}
                      onChange={handleSubOptionChange}
                    />
                    Confirm Cash On Delivery
                  </SubOptionLabel>
                </SubOptionContainer>
              )}
            </PaymentMethodContainer>
            <CheckoutButton
              disabled={!selectedPaymentMethod || !selectedSubOption}
              onClick={() => {
                handleOrder({
                  id: checkOutData._id,
                  paymentType: selectedPaymentMethod,
                });
                // Optionally, set showReceipt to true here if you want to show receipt immediately
                // setShowReceipt(true);
              }}
            >
              Proceed to Payment
            </CheckoutButton>
            {loading ? (
              <div className="loader">
                <DotLoader />
                <p>Initializing payment</p>
              </div>
            ) : null}
          </>
        )}
      </CheckoutWrapper>
    </>
  );
  
};
const CreditCardForm = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  padding: 15px;
  background: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #254336;
    }
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;

  ${FormField} {
    flex: 1;
  }
`;

const CheckoutWrapper = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  .loader{
  display: flex;
    flex-direction: column;
  align-items:center;
 position: absolute;
    top: 43%;
    right: 45%
  }
`;

const CheckoutHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    color: #333;
  }
`;
const OrderSummary = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
`;

const SummaryItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;
const PaymentMethodContainer = styled.div`
  margin-bottom: 20px;
`;

const PaymentMethodLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  cursor: pointer;
`;

const SubOptionContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 15px;
`;

const SubOptionLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background-color: #254336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(48, 101, 59);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default CheckoutPage;
