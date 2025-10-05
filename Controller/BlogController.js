
const model = require('../model/BlogModel')
const fs = require('fs');
const path = require('path');

module.exports.homePage = async  (req, res) => {
  try {

    const blogs = await model.find({});

    res.render('home', {blogs});


  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports.addBlog = (req, res) => {
  try {
    res.render('addBlog');
  } catch (error) {
    console.error("Error rendering add blog page:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports.createBlog = async (req, res) => {
    try {

        console.log(req.file , req.body);
        

        const blogData = {
            title: req.body.title,
            shortdescription: req.body.shortdescription,
            description: req.body.description,
            Image: model.imagePath + '/' + req.file.filename,
        };
        const newBlog = await model.create(blogData);
        res.redirect('/home');
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports.editBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await model.findById(blogId);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.render('editBlog', { blog });
    } catch (error) {
        console.error("Error rendering edit blog page:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await model.findById(blogId);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        const updatedData = {
            title: req.body.title,
            shortdescription: req.body.shortdescription,
            description: req.body.description,
        };

        if (req.file) {
       
            updatedData.Image = model.imagePath + '/' + req.file.filename;   
        }

        await model.findByIdAndUpdate(blogId, updatedData);
        res.redirect('/home');
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).send("Internal Server Error");
    }
} 


module.exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await model.findById(blogId);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        await model.findByIdAndDelete(blogId);
        res.redirect('/home');
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.readBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await model.findById(blogId);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.render('ReadBlog', { blog });
    } catch (error) {
        console.error("Error rendering read blog page:", error);
        res.status(500).send("Internal Server Error");
    }
  }