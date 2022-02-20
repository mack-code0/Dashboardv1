const User = require("../models/user")

exports.getLogin = (req, res)=>{
    res.render("auth/login", {path: "/login"})
}

exports.getSignup = (req, res)=>{
    res.render("auth/signup", {path: "/signup"})
}

exports.postLogin = (req, res)=>{
    User.getUser("620ecb9d1b5856129528e9d0")
    .then(user=>{
        req.session.user = user
        req.session.isAuthenticated = true
        req.session.save(err=>{
            res.redirect("/admin")
        })
    })
}

exports.logout = (req, res)=>{
    req.session.destroy(err=>{
        res.redirect("/login")
    })
}