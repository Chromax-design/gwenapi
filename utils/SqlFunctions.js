const { Pool } = require("../connection");

const SelectData = (table, filter, value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table} ${filter ? `WHERE ${filter}= ?` : ""}`;
    Pool.query(sql, [value], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      return;
    });
  });
};

const InsertData = (data, table) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} SET ?`;
    Pool.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      return;
    });
  });
};

const UpdateData = (table, data, filter, value) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${table} SET ? WHERE ${filter} = ?`;
    Pool.query(sql, [data, value], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      return;
    });
  });
};

const DeleteData = (table, filter, value) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE ${filter} = ?`;
    Pool.query(sql, [value], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      return;
    });
  });
};

module.exports = { SelectData, InsertData, UpdateData, DeleteData };
