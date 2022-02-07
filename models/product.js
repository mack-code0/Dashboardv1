const mongodb = require("mongodb")
const getDb = require("./../util/database").db
const getDate = require("../util/dateconstructor")

class Product{
    constructor(title, quantity, unitprice, description, imageurl){
        this.title = title,
        this.quantity = quantity,
        this.unitprice = unitprice,
        this.date = getDate(), 
        this.description = description,
        this.imageurl = imageurl
    }

    save(prodId, cb){
        const db = getDb()
        let dbOp;
        if(prodId){
            dbOp = db.collection("products").updateOne({_id: new mongodb.ObjectId(prodId)}, {$set: {...this}})
        }else{
            dbOp = db.collection("products").insertOne(this)
        }
        dbOp.then((result) => {
            cb(result)
        }).catch((err) => {
           cb(err) 
        });
    }

    static getProducts(cb){
        const db = getDb()
        db.collection("products").find().toArray()
        .then(result=>{
            cb(result)
        })
        .catch(err=>{
            cb(err)
        })
    }

    static getOneProduct(prodId, cb){
        let db = getDb()
        db.collection("products").find({_id: new mongodb.ObjectId(prodId)}).next()
        .then(product=>{
            cb(product)
        })
        .catch(err=>{
            cb(err)
        })
    }

    static deleteProduct(prodId, cb){
        const db = getDb()
        db.collection("products").deleteOne({_id: new mongodb.ObjectId(prodId)})
        .then((result) => {
            cb(result)
        }).catch((err) => {
            cb(err)
        });
    }
}

module.exports = Product