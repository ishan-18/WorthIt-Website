const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res)=>{
    try {
        const {first_name, last_name, email, password} = req.body
        //Checking if fields are empty or not 
        if(!first_name || !last_name || !email || !password){
            return res.status(400).json({msg: "Please Enter all the fields"})
        }

        //Email already exists or not
        const user = await User.findOne({email});
        if(user) return res.status(409).json({msg: "Email already exists"})

        //Checking Password's length
        if(password.length < 6) return res.status(400).json({msg: "Password must contain atleast 6 characters"})

        //Checking syntax of email
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return res.status(422).json({msg: "Invalid Email"})
        }

        //Sending fullname to server
        const full_name = first_name + " " + last_name

        //Hashed Password
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            first_name,
            last_name,
            full_name,
            email,
            password: hashedPassword
        });

        //Saving user to the database
        await newUser.save()

        //Creating accesstokens for authentication
        const accesstoken = createAccessToken({id: newUser._id})
        const refreshtoken = createRefreshToken({id: newUser._id})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })

        res.status(201).json({accesstoken})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.get('/refresh_token', async (req,res)=>{
    try {
        const rf_token = req.cookies.refreshtoken
        if(!rf_token) return res.status(401).json({msg: "Register or Log into your account"})
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
            if(err) return res.status(401).json({msg: "Register or Log into your account"})
            const accesstoken = createAccessToken({id: user.id})
            res.status(200).json({user, accesstoken})
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

const createAccessToken = (user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user)=>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'}) 
}


module.exports = router