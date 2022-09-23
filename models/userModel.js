const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type: 'string', require},
    email: {type: 'string', require},
    password: {type: 'string', require},
    isAdmin: {type: 'Boolean', require, default: false},
    isVerified: {type: 'Boolean', require, default: false}
},{
    timestamps : true,
})

module.exports = mongoose.model('users', userSchema)