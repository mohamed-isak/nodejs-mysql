const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

// chk data base

const controller = {};

const currentdate = new Date();


controller.addcategory = (req, res) => {
    const msg = { status: "success", statuscode: "200" };
    var date =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate();
  
  
    conn.getConnection((err, connection) => {
      if (err) throw err;
      var file = req.files.cateImage;
      var img_name = file.name;
      file.mv('public/images/product_images/' + img_name, function () {
        var sql = "INSERT INTO category SET?";
        const dataMap = {
          cate_name: req.body.cate_name,
          status: req.body.status,
          cate_image: img_name,
          cate_add_date: date,
        };
        connection.query(sql, dataMap, (err, rows) => {
          connection.release();
          if (!err) {
            res.json(msg);
          } else {
            console.log("error in listing data " + err);
            if(err.message.match('ER_DUP_ENTRY')){
              res.json({...variables.dataExists});
             }
          }
        });
      });
  
    });
  };

  module.exports = controller;