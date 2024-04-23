const express = require("express");
const bodyparser = require("body-parser");
const dotEnv = require("dotenv");
const cors = require("cors");
const { connect } = require("./connection");
const { AuthRouter } = require("./routes/AuthRoutes");
const PostRoute = require("./routes/PostRoutes");
const path = require("path");

dotEnv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "https://gwenblog.netlify.app"] }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads/posts")));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

connect();

app.use("/auth", AuthRouter);
app.use("/posts", PostRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
