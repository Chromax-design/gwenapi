const { SelectData } = require("./SqlFunctions");

const IfDataExist = async (table, filter, value) => {
  const result = await SelectData(table, filter, value);
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = { IfDataExist };
