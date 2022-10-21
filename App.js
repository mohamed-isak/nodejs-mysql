const express  = require("express");
const exPhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require('cors');
require('dotenv').config();
fileUpload = require('express-fileupload');
const app= express();


const port  = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// routes
const routes  = require('./src/routes/index');

app.use('/',routes)
app.use(express.static('public')); 
app.use('/images/product_images', express.static('images/product_images'));

app.listen(port,()=>{
    console.log("Listening Port:"+ port);
});

