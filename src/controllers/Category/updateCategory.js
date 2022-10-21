const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

// chk data base

const controller = {};

const currentdate = new Date();



controller.updatecategory = (req, res) => {
    const msg = { status: "success", statuscode: "200" };
    const dataMap = [req.body.cate_name, req.body.status, req.params.cate_id];
  
    console.log(dataMap);
    const status = req.body.status;
    conn.getConnection((err, connection) => {
      if (err) throw err;
      var sql = `UPDATE category SET CATE_NAME = ?, STATUS = ? where CATE_ID = ?`;
      connection.query(sql, dataMap, (err, rows) => {
        connection.release();
        if (!err) {
          res.json(msg);
        } else {
          console.log("error in listing data " + err);
        }
      });
    });
  };
  
  module.exports = controller;
  