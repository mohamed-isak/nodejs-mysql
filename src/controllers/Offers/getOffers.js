const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

const controller = {};


 controller.offerlist = (req, res) => {
  const dataMap = [];
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(`SELECT * FROM offers`, (err, rows) => {
        
        for (key in rows) {
          obKey = rows[key];
          dataMap.push({
            OfferId: obKey.OfferId,
            OfferName: obKey.OfferName,
            Offerdiscount: obKey.Offerdiscount,
            OfferImage:
              variables.domain + "images/offer_image/" + obKey.OfferImage,
          });
        }
        connection.release();
        if (!err) {
          res.json({ ...variables.goodResponse,data: dataMap });
        } else {
          console.log("error in listing data " + err);
        }
      });
    });
  };
  

  module.exports = controller;