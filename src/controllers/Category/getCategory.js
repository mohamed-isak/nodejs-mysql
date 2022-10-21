const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');
const controller = {};


// category of product
controller.category = (req, res) => {
  const dataMap = [];
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("select * from category", (err, rows) => {
        console.log(rows)
        for (key in rows) {
          obKey = rows[key];
          dataMap.push({
            CATE_ID: obKey.CATE_ID,
            CATE_NAME:  obKey.CATE_NAME,
            PROD_IMAGE:
              variables.domain + "images/product_images/" + obKey.CATE_IMAGE,
            STATUS: obKey.STATUS
          });
        }
        connection.release();
        if (!err) {
          res.json({...variables.goodResponse,data: dataMap});
        } else {
          console.log("error in listing data " + err);
        }
      });
    });
  };

  module.exports = controller;