const express = require('express');
const db = require('./config/db');
const path = require('path');
const app = express()
const cookiosParser = require('cookie-parser');
app.use(cookiosParser());
const port = 3000;


app.use((req, res, next) => {
  // Disable caching and back/forward cache
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/' , require('./router/BlogRouter'))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))