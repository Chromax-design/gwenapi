const bcrypt = require("bcryptjs");

const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(8);
  const hashed = await bcrypt.hash(pwd, salt);
  return hashed
};

const verifyPassword = async (hashedpwd, enteredPwd)=>{
  const verified = await bcrypt.compare(enteredPwd, hashedpwd);
  return verified;
}

module.exports = { hashPassword, verifyPassword };
