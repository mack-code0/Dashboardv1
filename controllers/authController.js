const User = require("../models/user")
const bcryptjs = require("bcryptjs")

exports.getLogin = (req, res)=>{
    const error = req.flash("error")
    const errorMessage = error.length>0?error:null

    const success = req.flash("success")
    const successMessage = success.length>0?success:null
    res.render("auth/login", {
        path: "/login",
        errorMessage: errorMessage,
        successMessage: successMessage
    })
}

exports.getSignup = (req, res)=>{
    const error = req.flash("error")
    const errorMessage = error.length>0?error:null
    res.render("auth/signup", {path: "/signup", errorMessage: errorMessage} )
}

exports.postLogin = (req, res)=>{
    const {email, password} = req.body
    User.getUser(email)
    .then(user=>{
        if(!user){
            // Invalid Credentials
            req.flash("error", "Invalid Credentials!")
            return res.redirect("/login")
        }

        bcryptjs.compare(password, user.password)
        .then(doMatch=>{
            if(!doMatch){
                // Invalid Credentials
                req.flash("error", "Invalid Credentials!")
                return res.redirect("/login")
            }

            req.session.user = user
            req.session.isLoggedIn = true
            req.session.save(err=>{
                res.redirect("/")
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
            req.flash("error", "User already exists!")
            return res.redirect("/signup")
        }

        return bcryptjs.hash(password, 12)
        .then(hashedPassword=>{
            const newUser = new User(email, hashedPassword)
            return newUser.save()
        })
        .then(result=>{
            req.flash("success", "Account created successfully! ")
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