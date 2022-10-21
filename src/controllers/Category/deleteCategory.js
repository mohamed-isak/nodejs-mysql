const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

// chk data base

const controller = {};

const currentdate = new Date();



// Delete Products
controller.deletecategory = (req, res) => {
    const { cateid } = req.params;
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM category where CATE_ID=${cateid}`,
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