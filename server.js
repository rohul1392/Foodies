const express = require('express')
require('dotenv').config()
const Food = require('./models/foodModel')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.use(express.raw({type: "*/*"}))
const db = require('./db.js')
const path = require('path')
const port = process.env.PORT ||8000

const foodsRoute = require('./routes/foodsRoute') 
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')
const stripeRoute = require('./routes/stripe')


app.use('/api/foods/', foodsRoute)
app.use('/api/users/',userRoute)
app.use('/api/orders/',ordersRoute)
app.use('/api/stripe/',stripeRoute)

if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

app.listen(port, () => `Server running on port port 🔥`)
