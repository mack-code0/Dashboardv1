const mongoDb = require("mongodb")
const getDb = require("../util/database").db


class User {
    constructor(name, email){
        this.name = name,
        this.email = email
    }

    static getUser(userId){
        let db = getDb()
        db.collection("admin_store").find({_id: new mongoDb.ObjectId(userId)}).next()
        .then(user=>{
            return user
        }).catch(err=>{
            console.log(err);
        })
    }

    save(){
        let db = getDb()
        db.collection("admin_store").insertOne(this)
        .then(result=>{
            return {message: "Done"}
        }).catch(err=>{
            console.log(err);
        })
    }
}

module.exports = User