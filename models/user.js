const mongoDb = require("mongodb")
const getDb = require("../util/database").db


class User {
    constructor(email, password){
        this.email = email
        this.password = password
    }

    static getUser(email){
        let db = getDb()
        return db.collection("admin_users").find({email: email}).next()
        .then(user=>{
            return user
        }).catch(err=>{
            console.log(err);
        })
    }

    save(){
        let db = getDb()
        return db.collection("admin_users").insertOne(this)
        .then(result=>{
            return {message: "Done"}
        }).catch(err=>{
            console.log(err);
        })
    }
}

module.exports = User