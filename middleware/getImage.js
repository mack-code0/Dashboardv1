const multer = require("multer")
module.exports = (req, res, next) => {
    const fileFilter = (req, file, cb)=>{
        if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
            cb(null, true)
        }else{
            cb(null, false)
        }
    }
    multer().single("image")
    console.log(req.file);
    next()
}