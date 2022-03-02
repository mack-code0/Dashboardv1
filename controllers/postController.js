const Product = require("../models/product")

exports.insertProduct = (req, res)=>{
    const {title, quantity, unitprice, description, imageurl, tag, category} = req.body
    const NewProduct = new Product(title, quantity, unitprice, description, imageurl, tag, category)
    NewProduct.save(null, null, cb=>{
        res.redirect("/insertproduct")
    })
}

exports.updateProduct = (req, res)=>{
    const {title, quantity, unitprice, description, imageurl, prodId, tag, category, oldprice} = req.body
    const updateProduct = new Product(title, quantity, unitprice, description, imageurl, tag, category)
    updateProduct.save(prodId, oldprice, cb=>{
        res.redirect("/")
    })
}

exports.deleteProduct = (req, res)=>{
    Product.deleteProduct(req.body.prodId, cb=>{
        res.json({success: "Done"})
    })
} 