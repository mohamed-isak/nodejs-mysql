const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

// chk data base

const controller = {};

const currentdate = new Date();



// Delete Products
controller.deleteoffers = (req, res) => {
    const { offerid } = req.params;
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(`SELECT * FROM offers where OfferId=${offerid}`, (err, rows) => {
        if (err) throw err;
        if(rows[0].OfferImage!=null){
            fs.unlink('public/images/offer_image/' + rows[0].OfferImage, (err) => {
            if (err) throw err;
        });}
        connection.query(
            `DELETE FROM offers where OfferId=${offerid}`,
            (err, rows) => {
              connection.release();
              if (!err) {
                res.json(variables.goodResponse);
              } else {
                console.log("error in listing data " + err);
                res.json(variables.badResponse);
              }
            }
          );
      })
     
    });
  };

   

  module.exports = controller;