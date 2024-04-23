const mysql = require("mysql2");

const options = {
  host: "bevh9rsyvmakx4iv7xkl-mysql.services.clever-cloud.com",
  database: "bevh9rsyvmakx4iv7xkl",
  user: "uoa5fslaquxwd4z0",
  password: "6EQl2HWc9rkO14J7BjKv",
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
