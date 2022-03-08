const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const { validationResult } = require("express-validator")

exports.getLogin = (req, res) => {
    const error = req.flash("error")
    const errorMessage = error.length > 0 ? error : null

    const success = req.flash("success")
    const successMessage = success.length > 0 ? success : null
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        errorMessage: errorMessage,
        successMessage: successMessage,
        oldInput: { email: "" },
        validationErrors: []
    })
}

exports.getSignup = (req, res) => {
    const error = req.flash("error")
    const errorMessage = error.length > 0 ? error : null
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "Signup",
        errorMessage: errorMessage,
        oldInput: { email: "" },
        validationErrors: []
    })
}

exports.postLogin = (req, res) => {
    const { email, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render("auth/login", {
            path: "/login",
            errorMessage: errors.array()[0].msg,
            successMessage: "",
            oldInput: { email },
            validationErrors: errors.array()
        })
    }

    User.getUser(email)
        .then(user => {
            if (!user) {
                // Invalid Credentials
                req.flash("error", "Email is not registered!")
                return res.redirect("/login")
            }

            bcryptjs.compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        // Invalid Credentials
                        req.flash("error", "Invalid Credentials!")
                        return res.redirect("/login")
                    }

                    req.session.user = user
                    req.session.isLoggedIn = true
                    req.session.save(err => {
                        res.redirect("/")
                    })
                })
        })
        .catch(err => {
            const error = new Error(err)
            err.httpStatusCode = 500
            next(error)
        })
}


exports.postSignup = (req, res) => {
    const { email, password, confirmPassword } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render("auth/signup", {
            path: "/signup",
            errorMessage: errors.array()[0].msg,
            oldInput: { email },
            validationErrors: errors.array()
        })
    }



    return bcryptjs.hash(password, 12)
        .then(hashedPassword => {
            const newUser = new User(email, hashedPassword)
            return newUser.save()
        })
        .then(result => {
            req.flash("success", "Account created successfully! ")
            return res.redirect("/login")
        }).catch(err => {
            const error = new Error(err)
            err.httpStatusCode = 500
            next(error)
        })
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        res.redirect("/login")
    })
}