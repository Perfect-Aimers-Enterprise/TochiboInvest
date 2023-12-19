const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/TCHIBO1')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        const fileExtension = path.extname(file.originalname)
        cb(null, file.fieldname + '_' + uniqueSuffix + fileExtension)
       
    }
    
})


const upload = multer({storage: storage})

router.post('/', upload.single('image'), (req, res) => {
    imageUrl = `/TCHIBO1/${req.file.filename}`

})

module.exports = {upload, router}