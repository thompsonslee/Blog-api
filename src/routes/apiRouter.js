const express = require("express")

const postController = require ("../controllers/postController")
const userController = require ("../controllers/userController")
const commentController = require("../controllers/commentController")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const router = express.Router()


router.get("/posts", postController.allPosts)

router.get("/posts/:post", postController.getPost)

router.post("/posts/:postID/comments",passport.authenticate('jwt', {session: false}), commentController.addComment)

router.post("/posts",passport.authenticate('jwt', {session: false}), postController.createPost)

router.post("/login", userController.login)

router.post("/register", userController.register)

module.exports = router
