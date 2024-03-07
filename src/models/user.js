const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    isAdmin: {type: Boolean, default: false}
})

module.exports = mongoose.model("User", userSchema)