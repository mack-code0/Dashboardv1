const User = require("../models/user")

exports.getLogin = (req, res)=>{
    res.render("login", {path: "/login"})
}

exports.postLogin = (req, res)=>{
    User.getUser("620e9b5b488b676dba399090")
    .then(user=>{
        req.session.user = user
        req.session.isAuthenticated = true
        req.session.save(err=>{
            res.redirect("/")
        })
    })
}