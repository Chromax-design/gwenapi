const { v4: uuidv4 } = require("uuid");
const { hashPassword, verifyPassword } = require("../utils/AuthUtils");
const { SelectData, InsertData } = require("../utils/SqlFunctions");

const Login = async (req, res) => {
  const { email, password: enteredPassword } = req.body;
  try {
    const checkEmailExist = await SelectData("users", "email", email);
    if (checkEmailExist.length === 0) {
      return res.status(404).json("Email not recognised");
    }

    const { username, password, uuid } = checkEmailExist[0];
    const verified = await verifyPassword(password, enteredPassword);

    if (!verified) {
      return res.status(403).json("Incorrect password");
    }

    return res
      .status(200)
      .json({ uuid, email, username, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json("An error occured");
  }
};

const Register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json("passwords do not match");
  }

  const pwdhash = await hashPassword(password);
  const dbdata = {
    uuid: uuidv4(),
    username,
    email,
    password: pwdhash,
  };

  try {
    const existingUser = await SelectData("users", "email", email);

    if (existingUser.length > 0) {
      return res.status(409).json("User already exist");
    }

    await InsertData(dbdata, "users");
    return res.status(200).json("Registration was successful");
  } catch (error) {
    console.error(error);
  }
};

const Getuser = async (req, res) => {
  const data = await SelectData("users");
  const user = data[0].username;
  res.status(200).json(user);
};

module.exports = {
  Login,
  Register,
  Getuser,
};
