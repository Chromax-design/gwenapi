const express = require("express");
const { Login, Register, Getuser } = require("../controllers/AuthControllers");
const AuthRouter = express.Router();

AuthRouter.post('/login', Login);
AuthRouter.post('/register', Register);
AuthRouter.get('/user', Getuser)

module.exports = { AuthRouter };
