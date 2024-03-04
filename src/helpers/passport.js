const user = require("../models/user")
const LocalStrategy = require("passport-local").Strategy
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const bcrypt = require("bcrypt")
const User = require("../models/user")

const passportConfig = async(passport) => {
    passport.use("login", new LocalStrategy(async function verify(username,password,cd){
        const user = await User.findOne({username: username}).exec()
        if(!user){
            return cb(null, false, "username and password dont match")
        }

        if(bcrypt.compare(password,user.password)){
            return cd(null,user)
        }
        return cd(null,false,"username and password dont match")

    }))

    passport.serializeUser((user,done) => done(null,user.id))
    passport.deserializeUser(async(id,done) => {
        return done(null,await User.findById(id).exec())
    })

    passport.use("jwt", new JWTStrategy(
        {
            secretOrKey: "test",
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
        }, async(token,done) =>{
            try{
                return done(null,token.user);
            }
            catch(error){
                done(error)
            }
        }))
}

module.exports = passportConfig



