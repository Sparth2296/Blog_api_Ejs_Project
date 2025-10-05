const express = require('express');
const db = require('./config/db');
const path = require('path');
const app = express()
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/' , require('./router/BlogRouter'))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))