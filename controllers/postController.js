const { validationResult } = require("express-validator")
const Product = require("../models/product")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

exports.insertProduct = (req, res, next) => {
    const { title, quantity, unitprice, description, tag, category } = req.body
    const image = req.file
    
    const errors = validationResult(req)
    if (!errors.isEmpty() || !image) {
        return res.status(422).render("add", {
            pageUrl: "/add",
            pageTitle: "Add Product",
            errorMessage: typeof image === "undefined" ? "Please select an Image" : errors.array()[0].msg,
            oldInput: { title, quantity, unitprice, description, tag, category }
        })
    }

    cloudinary.uploader.upload(`data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
        {
            folder: "NewLiquorStore/images",
            use_filename: true,
            unique_filename: true
        },
        (err, result) => {
            if (err) {
                return next(err)
            }

            const imageurl = {
                imageurl: result.secure_url,
                imageid: result.secure_url.split("/")[result.secure_url.split("/").length - 1].split(".")[0]
            }
            const NewProduct = new Product(title, quantity, unitprice, description, imageurl, tag, category)
            NewProduct.save(next, null, null, cb => {
                res.redirect("/insertproduct")
            })
        })
}

exports.updateProduct = (req, res, next) => {
    const { title, quantity, unitprice, description, prodId, tag, category, oldprice } = req.body
    const image = req.file
    const imagesize = image.size * 0.000001;
    
    const errors = validationResult(req)
    if (!errors.isEmpty() || imagesize>3) {
        return res.status(422).render("update", {
            pageUrl: "/update",
            pageTitle: "Update Product",
            errorMessage: imagesize>3?"Images must be less than 3mb":errors.array()[0].msg,
            oldInput: { prodId }
        })
    }

        Product.getOneProduct(next, prodId, product=>{
            if(image){
                cloudinary.uploader.destroy(`NewLiquorStore/images/${product.imageurl.imageid}`, (err, result)=>{
                    if(err){
                        return next(err)
                    }
                    console.log(result);
                    cloudinary.uploader.upload(`data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
                    {
                        folder: "NewLiquorStore/images",
                        use_filename: true,
                        unique_filename: true
                    }, (error, newResult)=>{
                        if(error){
                            return next(error)
                        }

                        imageurl = {
                            imageurl: newResult.secure_url,
                            imageid: newResult.secure_url.split("/")[newResult.secure_url.split("/").length - 1].split(".")[0]
                        }

                        const updateProduct = new Product(title, quantity, unitprice, description, imageurl, category, tag)
                        updateProduct.save(next, prodId, oldprice, cb => {
                            res.redirect("/")
                        })
                    })
                })
            }else{
                const updateProduct = new Product(title, quantity, unitprice, description, product.imageurl, category, tag)
                updateProduct.save(next, prodId, oldprice, cb => {
                    res.redirect("/")
                })
            }
        })
}

exports.deleteProduct = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.redirect("/")
    }
    Product.deleteProduct(next, req.body.prodId, cb => {
        res.json({ success: "Done" })
    })
} 