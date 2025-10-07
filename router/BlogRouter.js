const express = require('express');

const blogCtl = require('../Controller/BlogController')
const userctl = require('../Controller/userController')
const model = require('../model/BlogModel')
const authMiddleware = require('../middleware/auth')

const router = express.Router();


// user registration and login
router.get('/' , userctl.register);
router.post('/register' , userctl.UserRegister);
router.get('/login' , userctl.login);
router.post('/userlogin' , userctl.UserLogin)

// Blog Routes

router.get('/home', authMiddleware.auth, blogCtl.homePage);
router.get('/addBlog', authMiddleware.auth, blogCtl.addBlog);
router.post('/createBlog', authMiddleware.auth, model.uploadedImage, blogCtl.createBlog);
router.get('/edit/:id' , authMiddleware.auth, blogCtl.editBlog);
router.post('/updateBlog/:id' , authMiddleware.auth, model.uploadedImage , blogCtl.updateBlog);
router.get('/delete/:id' , authMiddleware.auth, blogCtl.deleteBlog);
router.get('/readBlog/:id' , authMiddleware.auth,blogCtl.readBlog);
router.get('/logout' , authMiddleware.auth, userctl.logout);

    

module.exports = router;