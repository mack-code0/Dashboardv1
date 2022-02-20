const User = require("../models/user")
const bcryptjs = require("bcryptjs")

exports.getLogin = (req, res)=>{
    res.render("auth/login", {path: "/login"})
}

exports.getSignup = (req, res)=>{
    res.render("auth/signup", {path: "/signup"})
}

exports.postLogin = (req, res)=>{
    const {email, password} = req.body
    User.getUser(email)
    .then(user=>{
        if(!user){
            // Invalid Credentials
            return res.redirect("/login")
        }

        bcryptjs.compare(password, user.password)
        .then(doMatch=>{
            if(!doMatch){
                // Invalid Credentials
                return res.redirect("/login")
            }

            req.session.user = user
            req.session.isLoggedIn = true
            req.session.save(err=>{
                res.redirect("/admin")
            })
        })
    })
}

exports.postSignup = (req, res)=>{
    const {email, password, confirmPassword} = req.body
    User.getUser(email)
    .then(user=>{
        if(user){
            // User already exists
            return res.redirect("/login")
        }

        return bcryptjs.hash(password, 12)
        .then(hashedPassword=>{
            const newUser = new User(email, hashedPassword)
            return newUser.save()
        })
        .then(result=>{
            return res.redirect("/login")
        })
    })
    .catch(err=>{console.log(err);})
}

exports.logout = (req, res)=>{
    req.session.destroy(err=>{
        res.redirect("/login")
    })
}