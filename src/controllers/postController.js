const mongoose = require("mongoose")
const Post = require("../models/post")


exports.allPosts = async(req,res) => {
    try{
    const allPosts = await Post.find({}).sort({date: 1}).exec()

    res.json({
        posts: allPosts
    })
    }
    catch(error){
        console.log(error)
    }
}
exports.createPost = async(req,res) => {
    res.json({
        message:"create post"
    })
}