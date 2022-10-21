const conn = require("../db");
var variables = require("../const");
const controller = {};

// Dashboard Home data

controller.dashboard = (req, res) => {
  const data = {};
  conn.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT COUNT(*) FROM category;`, (err, cat) => {
      data["category_count"] = cat[0]["COUNT(*)"];
      // product count
      connection.query("SELECT COUNT(*) FROM product;", (err, prod) => {
        data["product_count"] = prod[0]["COUNT(*)"];

        // stock count
        connection.query(
          "SELECT COUNT(*) FROM product WHERE STATUS_ID=1",
          (err, stock) => {
            data["instock_count"] = stock[0]["COUNT(*)"];
            // out of stock
            connection.query(
              "SELECT COUNT(*) FROM product WHERE STATUS_ID=3",
              (err, outstock) => {
                data["outof_stock_count"] = outstock[0]["COUNT(*)"];

                connection.release();
                if (!err) {
                  res.json({ data });
                } else {
                  console.log("error in listing data " + err);
                }
              }
            );
          }
        );
      });
    });
  });
};


// login 
controller.login=(req,res)=>{
  const {email,password} = req.body;
  const msg = {status:"success",statuscode:"200"}
  conn.getConnection((err,connection)=>{
      if(err) throw err;
      var sql = 'SELECT * FROM user WHERE EMAIL = ? AND PASSWORD = ?';
      connection.query(sql,[email,password],(err,rows)=>{
          connection.release();
          if(!err){
             if(rows.length>0){
                 res.json({...variables.goodResponse,'userId':rows[0]['ID']});
             }else{
              res.json(variables.dataNotmatched);
             }
           }
          else {console.log('error in listing data '+err)};
      })
  })
}   

controller.changePassword = (req, res) => {
  
  const dataMap = [req.body.newPassword, req.params.user_id];
  conn.getConnection((err, connection) => {
    if (err) throw err;
    var sql = `UPDATE user SET PASSWORD = ? where ID = ?`;
    connection.query(sql, dataMap, (err, rows) => {
      connection.release();
      if (!err) {
        res.json({...variables.goodResponse,"newPassword":req.body.newPassword});
      } else {
        console.log("error in listing data " + err);
      }
    });
  });
};

module.exports = controller;
