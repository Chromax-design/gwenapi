const mysql = require("mysql");

const options = {
  host: process.env.HOST || 'localhost',
  user: process.env.USER || "root",
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || 'gwen',
  connectionLimit: 10,
};

const Pool = mysql.createPool(options);

const connect = () => {
  Pool.getConnection((err, conection) => {
    if (err) {
      console.log(`There was an error... ${err}`);
    } else {
      console.log("connection successful....");
      conection.release();
    }
  });
};

module.exports = {
  Pool,
  connect,
};
