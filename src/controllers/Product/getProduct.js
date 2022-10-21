const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

const controller = {};


controller.view = (req, res) => {
    const dataMap = [];
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("select * from product", (err, rows) => {
        for (key in rows) {
          obKey = rows[key];
          dataMap.push({
            PROD_ID: obKey.PROD_ID,
            PROD_NAME: obKey.PROD_NAME,
            CATE_ID: obKey.CATE_ID,
            STATUS_ID: obKey.STATUS_ID,
            PROD_DEC: obKey.PROD_DEC,
            PROD_IMAGE:
              variables.domain + "images/product_images/" + obKey.PROD_IMAGE,
            PROD_MRP_PRICE: obKey.PROD_MRP_PRICE,
            PROD_PRICE: obKey.PROD_PRICE,
            PROD_ADDON: obKey.PROD_ADDON,
            PROD_FOOD_CAT: obKey.PROD_FOOD_CAT,
            PROD_ADD_DATE: obKey.PROD_ADD_DATE,
          });
        }
        connection.release();
  
        if (!err) {
          res.json({ data: dataMap });
        } else {
          console.log("error in listing data " + err);
          res.json({ data: variables.badResponse });
        }
      });
    });
  };
  
  // Single product
  
  controller.singleproduct = (req, res) => {
    const { id } = req.params;
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM product where PROD_ID=${id}`, (err, rows) => {
          
          const dataMap = {
            ...rows[0],
            PROD_IMAGE:
              variables.domain + "images/product_images/" + rows[0].PROD_IMAGE,
              PROD_IMAGE2:
              variables.domain + "images/product_images/" + rows[0].PROD_IMAGE2,  
          };
          console.log(dataMap);
          connection.release();
          if (!err) {
            if (rows.length > 0) {
              res.json(dataMap);
            } else {
              res.json(variables.noData);
            }
          } else {
            console.log("error in listing data " + err);
          }
        }
      );
    });
  };
  
  // Product Limit
  
  controller.limitproduct = (req, res) => {
    const { count } = req.params;
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(`SELECT * FROM product LIMIT ${count}`, (err, rows) => {
        connection.release();
        if (!err) {
          res.json({ data: rows });
        } else {
          console.log("error in listing data " + err);
        }
      });
    });
  };
  
  controller.productstatus = (req, res) => {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("select * from prodstatus", (err, rows) => {
        connection.release();
        if (!err) {
          res.json({ data: rows });
        } else {
          console.log("error in listing data " + err);
        }
      });
    });
  };
  
  // Related Products
  controller.relatedproducts = (req, res) => {
    const { catid, prodid } = req.params;
    const dataMap = [];
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM product where CATE_ID=${catid} AND NOT PROD_ID=${prodid}`,
        (err, rows) => {

          for (key in rows) {
            obKey = rows[key];
            dataMap.push({
              PROD_ID: obKey.PROD_ID,
              PROD_NAME: obKey.PROD_NAME,
              CATE_ID: obKey.CATE_ID,
              STATUS_ID: obKey.STATUS_ID,
              PROD_DEC: obKey.PROD_DEC,
              PROD_IMAGE:
                variables.domain + "images/product_images/" + obKey.PROD_IMAGE,
              PROD_MRP_PRICE: obKey.PROD_MRP_PRICE,
              PROD_PRICE: obKey.PROD_PRICE,
              PROD_ADDON: obKey.PROD_ADDON,
              PROD_FOOD_CAT: obKey.PROD_FOOD_CAT,
              PROD_ADD_DATE: obKey.PROD_ADD_DATE,
            });
          }
          connection.release();
          if (!err) {
            res.json({...variables.goodResponse,data:dataMap});
          } else {
            console.log("error in listing data " + err);
          }
        }
      );
    });
  };

  // Offer Products
  controller.offerproducts = (req, res) => {
    const dataMap = [];
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM product where IS_OFFER='TRUE'`,
        (err, rows) => {

          for (key in rows) {
            obKey = rows[key];
            dataMap.push({
              PROD_ID: obKey.PROD_ID,
              PROD_NAME: obKey.PROD_NAME,
              CATE_ID: obKey.CATE_ID,
              STATUS_ID: obKey.STATUS_ID,
              PROD_DEC: obKey.PROD_DEC,
              PROD_IMAGE:
                variables.domain + "images/product_images/" + obKey.PROD_IMAGE,
              PROD_MRP_PRICE: obKey.PROD_MRP_PRICE,
              PROD_PRICE: obKey.PROD_PRICE,
              PROD_ADDON: obKey.PROD_ADDON,
              PROD_FOOD_CAT: obKey.PROD_FOOD_CAT,
              PROD_ADD_DATE: obKey.PROD_ADD_DATE,
              PROD_OFFER_VALUE: obKey.OFFER_VALUE
            });
          }
          connection.release();
          if (!err) {
            res.json({...variables.goodResponse,data:dataMap});
          } else {
            console.log("error in listing data " + err);
          }
        }
      );
    });
  };
  

  // Category base product
  controller.categoryproduct = (req, res) => {
    const dataMap = [];
    const { catid, prodid } = req.params;
    conn.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM product where CATE_ID=${catid}`,
        (err, rows) => {
          for (key in rows) {
            obKey = rows[key];
            dataMap.push({
              PROD_ID: obKey.PROD_ID,
              PROD_NAME: obKey.PROD_NAME,
              CATE_ID: obKey.CATE_ID,
              STATUS_ID: obKey.STATUS_ID,
              PROD_DEC: obKey.PROD_DEC,
              PROD_IMAGE:
                variables.domain + "images/product_images/" + obKey.PROD_IMAGE,
              PROD_MRP_PRICE: obKey.PROD_MRP_PRICE,
              PROD_PRICE: obKey.PROD_PRICE,
              PROD_ADDON: obKey.PROD_ADDON,
              PROD_FOOD_CAT: obKey.PROD_FOOD_CAT,
              PROD_ADD_DATE: obKey.PROD_ADD_DATE,
            });
          }
          connection.release();
          if (!err) {
            res.json({ data: dataMap });
          } else {
            console.log("error in listing data " + err);
          }
        }
      );
    });
  };
  
  module.exports = controller;

