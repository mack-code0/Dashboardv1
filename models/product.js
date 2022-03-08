const mongodb = require("mongodb")
const getDb = require("./../util/database").db

class Product{
    constructor(title, quantity, unitprice, description, imageurl, category, tag){
        this.title = title,
        this.quantity = quantity,
        this.unitprice = unitprice,
        this.date = Date.now(), 
        this.description = description,
        this.imageurl = imageurl,
        this.category = category,
        this.tag = tag,
        this.oldprice = ""
    }

    save(next, prodId, oldprice, cb){
        const db = getDb()
        let dbOp;
        if(prodId){
            this.oldprice = oldprice
            dbOp = db.collection("products").updateOne({_id: new mongodb.ObjectId(prodId)}, {$set: {...this}})
        }else{
            dbOp = db.collection("products").insertOne(this)
        }
        dbOp.then((result) => {
            cb(result)
        }).catch(err => {
            const error = new Error(err)
            err.httpStatusCode = 500
            next(error)
        })
    }

    static getProducts(next, cb){
        const db = getDb()
        db.collection("products").find().toArray()
        .then(result=>{
            cb(result)
        }).catch(err => {
            const error = new Error(err)
            err.httpStatusCode = 500
            next(error)
        })
    }

    static getOneProduct(next, prodId, cb){
        let db = getDb()
        db.collection("products").find({_id: new mongodb.ObjectId(prodId)}).next()
        .then(product=>{
            cb(product)
        }).catch(err => {
            const error = new Error(err)
            err.httpStatusCode = 500
            next(error)
        })
    }

    static deleteProduct(next, prodId, cb){
        const db = getDb()
        db.collection("products").deleteOne({_id: new mongodb.ObjectId(prodId)})
        .then((result) => {
            cb(result)
        }).catch(err => {
            const error = new Error(err)
            err.httpStatusCode = 500
            next(error)
        })
    }
}

module.exports = Product