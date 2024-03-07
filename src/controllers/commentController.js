const mongoose = require("mongoose")
const Comment = require("../models/comment")
const jwt = require("jsonwebtoken")

exports.addComment = async(req,res) =>{
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        return decoded.user
    })
    res.json({user: user})
    // const comment = new Comment({
    //     post: req.params.postID,
    //     user: user._id,
    //     content: req.params.content
    // })

}