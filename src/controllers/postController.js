const mongoose = require("mongoose")
const Comment = require("../models/comment")
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
exports.getPost = async(req,res) => {
    try{
        const post = await Post.findById(req.params.id).exec()
        const comments = await Comment.find({post: req.params.id}).exec()

        res.json({posts: post, comments: comments})

    }
    catch(error){
        console.log(error)
    }
}
exports.createPost = async(req,res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    })
    await post.save()
    res.sendStatus(200)
}