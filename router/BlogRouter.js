const express = require('express');

const blogCtl = require('../Controller/BlogController')
const userctl = require('../Controller/userController')
const model = require('../model/BlogModel')

const router = express.Router();


// user registration and login
router.get('/' , userctl.register);
router.post('/register' , userctl.UserRegister);
router.get('/login' , userctl.login);
router.post('/userlogin' , userctl.UserLogin)

// Blog Routes

router.get('/home', blogCtl.homePage);
router.get('/addBlog', blogCtl.addBlog);
router.post('/createBlog', model.uploadedImage, blogCtl.createBlog);
router.get('/edit/:id' , blogCtl.editBlog);
router.post('/updateBlog/:id' , model.uploadedImage , blogCtl.updateBlog);
router.get('/delete/:id' , blogCtl.deleteBlog);
router.get('/readBlog/:id' , blogCtl.readBlog);



module.exports = router;