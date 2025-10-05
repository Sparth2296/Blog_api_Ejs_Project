const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagePath = '/uploads';


const blogModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    shortdescription: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: true
    },
    Image:{
        type: String,
        required: true
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', imagePath));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})


blogModel.statics.uploadedImage = multer({ storage: storage }).single('Image');
blogModel.statics.imagePath = imagePath;

const Blog = mongoose.model('Blog', blogModel);

module.exports = Blog;