const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

// chk data base

const controller = {};

const currentdate = new Date();


// Add Product
controller.addproduct = (req, res) => {
  const msg = { status: "success", statuscode: "200" };
  conn.getConnection((err, connection) => {
    if (err) throw err;
    var file = req.files.PROD_IMAGE;

    var date =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate();
    var isfileMoved = [];


    file.map((item) => {
      var img_name = item.name;
      item.mv("public/images/product_images/" + img_name, function (er) {
        if (er) { return res.status(500).send(err) }
        else { isfileMoved.push(true) }
      });
    })
    if (isfileMoved.every((item) => { item == true })) {
      console.log('file moved');
      const dataMap = {
        PROD_NAME: req.body.PROD_NAME,
        CATE_ID: req.body.CATE_ID,
        STATUS_ID: req.body.STATUS_ID,
        PROD_DEC: req.body.PROD_DEC,
        PROD_IMAGE: file[0].name,
        PROD_IMAGE2: file[1].name,
        PROD_MRP_PRICE: req.body.PROD_MRP_PRICE,
        PROD_PRICE: req.body.PROD_PRICE,
        IS_OFFER: req.body.IS_OFFER,
        OFFER_VALUE: req.body.OFFER_VALUE,
        PROD_ADDON: req.body.PROD_ADDON,
        PROD_FOOD_CAT: req.body.PROD_FOOD_CAT,
        PROD_ADD_DATE: date,
      };

      connection.query("INSERT INTO product SET?", dataMap, (err, rows) => {
        connection.release();
        if (!err) {
          res.json(msg);
        } else {
          console.log("error in listing data " + err);
        }
      });
    }
  });
};

module.exports = controller;