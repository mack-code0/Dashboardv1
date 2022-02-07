const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient

let _db;

const mongoConnect = (cb)=>{
    MongoClient.connect("mongodb://127.0.0.1:27017/dashboard")
    .then(client=>{
        _db = client.db()
        cb()
    })
    .catch(err=>{
        console.log(err);
    })
}


const getDb = ()=>{
    if(_db){
        return _db
    }
    throw "Cannot connect to database"
}


exports.mongoConnect = mongoConnect
exports.db = getDb