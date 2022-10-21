const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

// chk data base

const controller = {};

const currentdate = new Date();




// Add Offers
controller.addoffers = (req, res) => {
    const msg = { status: "success", statuscode: "200" };
    var date =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate();
  
    conn.getConnection((err, connection) => {
      if (err) throw err;
      var file = req.files.uploaded_image;
      console.log(file)
      var img_name = file.name;
      file.mv('public/images/offer_image/' + img_name, function (er) {
        if (er) return res.status(500).send(err);
        const dataMap = {
          OfferName: req.body.OfferName,
          Offerdiscount: req.body.Offerdiscount,
          OfferImage: img_name,
          Date: date,
        };
  
        var sql = "INSERT INTO offers SET?";
        connection.query(sql, dataMap, (err, rows) => {
          connection.release();
          if (!err) {
            res.json({...variables.goodResponse});
          } else {
            console.log("error in listing data " + err);
            if(err.message.match('ER_DUP_ENTRY')){
              res.json({...variables.dataExists});
             }
          }
        });
      })
    });
  };

  module.exports = controller;