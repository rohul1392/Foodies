const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const sendEmail = require('../services/emailService');
var jwt = require('jsonwebtoken');

require('dotenv').config()


router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    const newUser = new User({name, email, password});

    try {
        const token = await jwt.sign({
            email: newUser.email
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const activationLink = `${process.env.CLIENT_URL}/user/verify?token=${token}`;
        
        const options = {
            to: email,
            from: `"Bimi Kitchen" devapon77@gmail.com`,
            subject: "Activate Your Account",
            template: "email-verification",
            templateVars: {
                username: name,
                activationLink,
            },
        };

        await sendEmail(options);
        
        // emailService.transporter.sendMail(options, function(err, res) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(res);
        //     }
        // })
        await newUser.save();

        res.send('User Registered successfully');
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error});
    }
})

router.post('/login',async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        if (user) {
            if(!user.isVerified) {
                return res.status(401).send({message:'Email is not verified.'})
            }
            const currentUser = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            res.send(currentUser);
        }
        else {
            return res.status(401).send({message: 'Username/password is worng. Please check your credentials.'});
        }
    } catch (error) {
        return res.status(401).send({message:'Username/password is worng. Please check your credentials.'})
        
    }
})

router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.get("/verify", async(req, res) => {
    const {token} = req.query;
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({email: decoded.email});
        user.isVerified = true;
        await user.save();

        const loginLink = `${process.env.CLIENT_URL}/login`;
        
        const options = {
            to: user.email,
            from: `"Bimi Kitchen" devapon77@gmail.com`,
            subject: "Account Activation Successful",
            template: "account-activation",
            templateVars: {
                username: user.name,
                loginLink,
            },
        };

        await sendEmail(options);
        res.status(200).json({message: 'Email Verified.'})
    } catch (error) {
        return res.status(400).json({message:'Email Verification failed'});
    }
  
});

router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

module.exports = router