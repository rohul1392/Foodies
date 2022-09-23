const express = require("express");
const router = express.Router();

// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51Jw3bUJYxHFKrvkMLNqRY6A239LQRhEaAEDVYpbegu861Y2FZ32vTyw1kd21k0Mnm5ZQBuihelHGHjEhxnC8GEO900tsejH7WD")
const Order = require('../models/orderModel')
const sendEmail = require('../services/emailService');


const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1000;
  };

router.post("/placeorder", async(req, res) => {
  const {token , subtotal , currentUser , cartItems} = req.body
  try {
      const customer = await stripe.customers.create({
          email : token.email,
          source:token.id
      })
      const payment = await stripe.charges.create({
          amount:subtotal,
          currency:'jpy',
          customer : customer.id,
          receipt_email : token.email
      }, {
          idempotencyKey : uuidv4()
      })

      if(payment)
      {
          const neworder = new Order({
              name : currentUser.name,
              email : currentUser.email ,
              userid : currentUser._id ,
              orderItems : cartItems , 
              orderAmount : subtotal,
              shippingAddress : {
                  street : token.card.address_line1,
                  city : token.card.address_city,
                  country : token.card.address_country,
                  pincode : token.card.address_zip
              },
              transactionId : payment.source.id
          })

        const options = {
            to: `mailme2apon.saha@gmail.com`,
            from: `"Bimi Kitchen" devapon77@gmail.com`,
            subject: "Order Placed ",
            template: "order-details",
            templateVars: {
              username : neworder.name ? neworder.name : 'abc' ,
              email :  customer.email ,
              subtotal: neworder.orderAmount,
              transactionId: customer.source? customer.source : token.id,
              date: new Date(),
            },
        };
          
          await sendEmail(options);
          await neworder.save();
        
          res.send('Order placed successfully');
      }
      else{
          res.send('Payment failed')
      }

  } catch (error) {
      return res.status(400).json({ message: 'Something went wrong' + error});
  }

});

router.post("/takeout", async(req, res) => {
  const {subtotal , name,email,phone, cartItems,userId} = req.body
  try {
    const neworder = new Order({
        name : name,
        email : email ,
        userid : userId ,
        orderItems : cartItems , 
        orderAmount : subtotal,
        phone : phone,
        isTakeout: 1
    })
    await neworder.save()
    res.send('Order placed successfully')
  } catch (error) {
      return res.status(400).json({ message: 'Something went wrong' + error});
  }
});
router.post("/cashondelivery", async(req, res) => {
    const {subtotal , name,email,phone, cartItems,userId,address,zipCode,building} = req.body
    try {
      const neworder = new Order({
          name : name,
          email : email ,
          userid : userId ,
          orderItems : cartItems , 
          orderAmount : subtotal,
          phone : phone,
          isTakeout: 2,
          address,
          zipCode,
          building
      })
      await neworder.save()
      res.send('Order placed successfully')
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' + error});
    }
  });

router.post("/getuserorders", async(req, res) => {
  const {userid} = req.body
  try {
      const orders = await Order.find({userid : userid}).sort({_id : -1}).limit(5)
      res.send(orders)
  } catch (error) {
      return res.status(400).json({ message: 'Something went wrong' });
  }
});

router.get("/getallorders", async(req, res) => {
     try {
        const LIMIT = 20;
        const page = parseInt(req.query.page || "0");
        const startIndex = (Number(page) - 1) * LIMIT; 
        const total = await Order.countDocuments({});
        const orders = await Order.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
         res.json({ data: orders, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
     } catch (error) {
         return res.status(400).json({ message: error});
     }

});

router.post("/deliverorder", async(req, res) => {

    const orderid = req.body.orderid
    try {
        const order = await Order.findOne({_id : orderid})
        order.isDelivered = 1
        await order.save()
        res.send('Order Delivered Successfully')
    } catch (error) {

        return res.status(400).json({ message: error});
 
    }
  
});
router.post("/cancellorder", async(req, res) => {
    const orderid = req.body.orderid
    try {
        const order = await Order.findOne({_id : orderid})
        order.isDelivered = 2
        await order.save()
        res.send('Order Cancelled Successfully')
    } catch (error) {
        return res.status(400).json({ message: error});
    }
});

router.get("/getpendingorders", async(req, res) => {
    try {
        const orders = await Order.find({isDelivered : 0})
        res.json({ data: orders.length});
    } catch (error) {
        return res.status(400).json({ message: error});
    }
});



module.exports = router

