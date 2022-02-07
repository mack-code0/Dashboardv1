const Product = require("../models/product")

exports.insertProduct = (req, res)=>{
    const {title, quantity, unitprice, description, imageurl} = req.body
    const NewProduct = new Product(title, quantity, unitprice, description, imageurl)
    NewProduct.save(null, cb=>{
        res.redirect("/admin/insertproduct")
    })
}

exports.updateProduct = (req, res)=>{
    const {title, quantity, unitprice, description, imageurl, prodId} = req.body
    const updateProduct = new Product(title, quantity, unitprice, description, imageurl)
    updateProduct.save(prodId, cb=>{
        res.redirect("/admin")
    })
}

exports.deleteProduct = (req, res)=>{
    Product.deleteProduct(req.body.prodId, cb=>{
        res.json({success: "Done"})
    })
} 