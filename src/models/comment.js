const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    post: {type: mongoose.Schema.Types.ObjectId, ref:"Post"},
    content: {type: string}
})

modules.exports = mongoose.model("Comment", commentSchema)