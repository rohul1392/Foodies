const express = require("express");
const router = express.Router();
require('dotenv').config()
const bodyparser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const Order = require('../models/orderModel')
const sendEmail = require('../services/emailService');

let cart_items = [];

router.post('/create-checkout-session', async (req, res) => {
  // const _cart = JSON.stringify(req.body.items.items)
  cart_items.push(JSON.stringify(req.body.items.items))
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      // cart: JSON.stringify(req.body.items.items)
    }, 
  })
  const line_items = req.body.items.items.map((item) => {
    // console.log();
    return {
      price_data: {
        currency: "jpy",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price,
      },
      quantity: 1,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["JP"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 100,
            currency: "jpy",
          },
          display_name: "Free shipping near shinkoiwa station",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "hour",
              value: 1,
            },
            maximum: {
              unit: "hour",
              value: 2,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 200,
            currency: "jpy",
          },
          display_name: "Delivery from more than 1KM",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "hour",
              value: 1,
            },
            maximum: {
              unit: "hour",
              value: 1,
            },
          },
        },
      },
    ],
    // phone_number_collection: {
    //   enabled: true,
    // },
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/CheckoutSuccess`,
    // success_url: `https://bimikitchen.jp`,
    // success_url: "http://localhost:3000/CheckoutSuccess?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: 'http://localhost:3000/#',
  });

  res.json({ url: session.url })

});

// Create order function

const createOrder = async (customer, data) => {
  const Items = JSON.parse(cart_items);
  console.log('cart item', data);
  const products = Items.map((item) => {
    return {
      productId: item.id,
      quantity: item.cartQuantity,
    };
  });

  const newOrder = new Order({
    customerId: data.customer,
    name: data.customer_details.name,
    email: data.customer_details.email,
    paymentIntentId: data.payment_intent,
    orderItems: cart_items,
    orderAmount: data.amount_subtotal,
    total: data.amount_total,
    shippingAddress: data.customer_details,
    payment_status: data.payment_status,
    isTakeout: false,
  });

  const options = {
    to: newOrder.email,
    from: `"Bimi Kitchen" devapon77@gmail.com`,
    subject: "Order Placed ",
    template: "order-details",
    templateVars: {
      username: newOrder.name ,
      email: newOrder.email,
      subtotal: newOrder.orderAmount,
      transactionId: newOrder.paymentIntentId,
      date: new Date(),
      shippingAddress: newOrder.shippingAddress,
      shippingAddress_city: newOrder.shippingAddress.city,
      shippingAddress_country: newOrder.shippingAddress.country,
      shippingAddress_line1: newOrder.shippingAddress.line1,
      shippingAddress_line2: newOrder.shippingAddress.line2,
      shippingAddress_postal_code: newOrder.shippingAddress.postal_code,
      shippingAddress_state: newOrder.shippingAddress.state,
      total: newOrder.total,
      orderItems: newOrder.orderItems
    },
  };
  
  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
    await sendEmail(options);
  } catch (err) {
    console.log(err);
  }
};


//stripe webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    // webhookSecret = endpointSecret;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let _cart;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
        
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
      _cart = req.body;

      // console.log('Event Data------------------------', data,_cart);
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            createOrder(customer, data);s
          } catch (err) {
            // console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);


module.exports = router