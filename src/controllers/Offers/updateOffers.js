const conn = require("../../db");
var cors = require("cors");
var bodyParser = require("body-parser");
var variables = require("../../const");
var fs = require('fs');

// chk data base

const controller = {};

const currentdate = new Date();



//update offers
controller.updateoffers = (req, res) => {
    const msg = { status: "success", statuscode: "200" };
    var date =
        currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate();

    conn.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`SELECT * FROM offers where OfferId=${req.body.offerId}`, (err, rows) => {
            if (err) throw err;
            console.log(rows);
            const body = req.body;
            if (req.files != null) {
                fs.unlink('public/images/offer_image/' + rows[0].OfferImage, (err) => {
                    if (err) throw err;
                });
                var file = req.files.offer_image;
                var img_name = file.name;
                file.mv('public/images/upload_images/' + img_name, function () {
                    const dataMap = [body.OfferName, body.Offerdiscount, img_name, body.offerId];

                    var sql = `UPDATE offers SET OfferName = ?, Offerdiscount = ?, OfferImage =?  where OfferId = ?`;
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
                const dataMap = [body.OfferName, body.Offerdiscount, body.offerId];

                var sql = `UPDATE offers SET OfferName = ?, Offerdiscount = ? where OfferId = ?`;
                connection.query(sql, dataMap, (err, rw) => {
                    connection.release();
                    if (!err) {
                        res.json(msg);
                    } else {
                        console.log("error in listing data " + err);
                    }
                });
            }

        })
    });
};

module.exports = controller;