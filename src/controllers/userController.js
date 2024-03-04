const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const passport = require("passport")

exports.login = async(req,res,next) =>{
    passport.authenticate('login', async(err,user,info) => {
        try{
            if(err || !user){
                const error = new Error("an error occured")

                return next(error)
            }
            req.login(user,{session: false}, async(error) =>{
                if(error) return next(error)

                const body = { _id: user._id}
                const token = JWT.sign({ user: body }, process.env.JWT_SECRET)

                return res.json({ token })
            })
        }
        catch(error){
            return next(error)
        }
    })(req,res,next);
}



exports.register = async(req,res) => {
    console.log(req)
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    })
    await user.save()
    res.status(200).json({
        message: "user created succesfully"
    })
}