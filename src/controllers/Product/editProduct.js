const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

// chk data base

const controller = {};

const currentdate = new Date();



//update offers
controller.updateproduct = (req, res) => {
    const msg = { status: "success", statuscode: "200" };
    var date =
        currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate();

    conn.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`SELECT * FROM product where PROD_ID=${req.body.productId}`, (err, rows) => {
            if (err) throw err;
            console.log(rows);
            const body = req.body;
            if (req.files != null) {
                fs.unlink('public/images/product_images/' + rows[0].PROD_IMAGE, (err) => {
                    if (err) throw err;
                });
                var file = req.files.productImage;
                var img_name = file.name;
                file.mv('public/images/product_images/' + img_name, function () {
                    
                    const dataMap = [req.body.PROD_NAME, req.body.CATE_ID, req.body.STATUS_ID,req.body.PROD_DEC,
                        img_name, req.body.PROD_MRP_PRICE,req.body.PROD_PRICE,req.body.PROD_ADDON,
                        req.body.PROD_FOOD_CAT,req.body.productId];

 var sql = `UPDATE product SET PROD_NAME = ?, CATE_ID = ?, STATUS_ID =?, PROD_DEC=?, PROD_IMAGE=?, PROD_MRP_PRICE=?, PROD_PRICE=?, PROD_ADDON=?, PROD_FOOD_CAT=? where PROD_ID = ?`;
                    connection.query(sql, dataMap, (err, rw) => {
                        connection.release();
                        if (!err) {
                            res.json(msg);
                        } else {
                            console.log("error in listing data " + err);
                        }
                    });
                })
            } else {
                const dataMap = [req.body.PROD_NAME, req.body.CATE_ID, req.body.STATUS_ID,req.body.PROD_DEC,
                    img_name, req.body.PROD_MRP_PRICE,req.body.PROD_PRICE,req.body.PROD_ADDON,
                    req.body.PROD_FOOD_CAT,req.body.productId];

var sql = `UPDATE product SET PROD_NAME = ?, CATE_ID = ?, STATUS_ID =?, PROD_DEC=?, PROD_IMAGE=?, PROD_MRP_PRICE=?, PROD_PRICE=?, PROD_ADDON=?, PROD_FOOD_CAT=? where PROD_ID = ?`;
                connection.query(sql, dataMap, (err, rw) => {
                    connection.release();
                    if (!err) {
                        res.json(variables.goodResponse);
                    } else {
                        console.log("error in listing data " + err);
                    }
                });
            }

        })
    });
};

module.exports = controller;