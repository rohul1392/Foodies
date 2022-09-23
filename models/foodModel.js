const mongoose  = require("mongoose");

const foodSchema = mongoose.Schema({
    name: { type: 'string', require},
    varients: [],
    prices: [],
    category: { type: 'string', require},
    image: { type: 'string', require},
    description: { type: 'string', require},
} , {
    timestamps:true,
})

const foodModel = mongoose.model('food', foodSchema)

module.exports = foodModel