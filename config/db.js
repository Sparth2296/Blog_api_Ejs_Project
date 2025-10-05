const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Blog_api_Ejs_Project')


const db = mongoose.connection;

db.once('open', () => {
    console.log("Database connected");
})

module.exports = db;