import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder, takeOutOrder } from '../actions/orderActions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



import CheckoutForm from "./CheckoutForm";
import '../stripe.css';

const stripePromise = loadStripe("pk_test_51Jw3bUJYxHFKrvkMXZwtxtFDjtoVGiD25rUvXmIVCL9he0V0idTeGc6XSNrhOnhSzOt2KLfqagFbpY6IEmdUOk8i00N0cxvf2J");


export default function Stripecheckout({ subtotal }) {
  const [clientSecret, setClientSecret] = useState("");
  const orderstate = useSelector((state) => state.placeOrderReducer)
  const cartstate = useSelector(state => state.cartReducer);
  const cartItems = cartstate.cartItems;
  console.log('cartItems', cartItems);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/orders/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="row justify-content-center m-4">
      <Container>
        <Row>
          <Col>
            {/* <image src="./bg.svg"/> */}
            <h1>Image</h1>
            {subtotal}
          </Col>
          <Col>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm subtotal={subtotal}/>
            </Elements>
          )
          }
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}