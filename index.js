const express = require('express');
var exphbs  = require('express-handlebars');

const path = require('path')
var app = express();
const port = 4000

app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "static")))
app.use('/', require(path.join(__dirname, 'routes/blog.js'))) //for '/'-endpoint we have to use the blog.js as '/' endpoint is there in the blog.js file
app.use('/', require(path.join(__dirname, 'routes/fileTree.js'))) //for '/'-endpoint we have to use the blog.js as '/' endpoint is there in the blog.js file

app.listen(port, ()=>{
    console.log(`app is listening at http://localhost:${port}`);
})