const mysql = require("mysql");

const options = {
  host: "localhost",
  user: "root",
  password: "",
  database: "gwen",
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
