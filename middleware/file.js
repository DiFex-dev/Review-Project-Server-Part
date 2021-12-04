const multer = require("multer")
const { Types } = require("mysql")

const storage = multer.diskStorage({
    destination(req, file, cb){
        cd(null, "images/")
    },
    filename(req, file, cb){
        cb(null, new Data().toISOString() + "-" + file.originalname)
    }
})

const type = ["images/png", "images/jpeg", "images/jpg"]

const fileFilter = (req, file, cb) => {
    if (types.include(file.mimetype)){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter})