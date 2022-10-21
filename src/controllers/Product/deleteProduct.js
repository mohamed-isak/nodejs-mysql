const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');
const controller = {};


// Delete Products
controller.deleteproduct = (req, res) => {
    const { prodid } = req.params;
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM product where PROD_ID=${prodid}`,
        (err, rows) => {
          connection.release();
          if (!err) {
            res.json({ data: "success", statuscode: 200 });
          } else {
            console.log("error in listing data " + err);
            res.json({ data: "Failure", statuscode: 400 });
          }
        }
      );
    });
  };

  module.exports = controller;