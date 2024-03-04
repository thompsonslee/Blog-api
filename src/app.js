require("dotenv").config()
const express = require("express")
const indexRouter = require("./routes/apiRouter")
const mongoose = require ("mongoose")
const passport = require("passport")
const passportConfig = require("./helpers/passport")
const logger = require('morgan');
const createError = require("http-errors")

const mongodb = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

main().catch((err) =>{
    console.log(err)
})
async function main(){
    await mongoose.connect(mongodb)
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'))

passportConfig(passport)

app.use("/", indexRouter)

app.use(function(req,res,next){
    next(createError(404))
})


module.exports = app

