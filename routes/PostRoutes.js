const express = require("express");
const path = require("path");
const {
  CreatePost,
  GetAllPosts,
  GetPost,
  EditPost,
} = require("../controllers/PostControllers");
const postRoute = express.Router();
const multer = require("multer");
const { CheckImgSize } = require("../middleware/CheckImgSize");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadLocation = path.join(__dirname, "../uploads/posts");
    cb(null, uploadLocation);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });

postRoute.get("/", GetAllPosts);
postRoute.get("/:postId", GetPost);
postRoute.post("/create", upload.single("image"), CheckImgSize, CreatePost);
postRoute.put("/edit/:postId", upload.single("image"),CheckImgSize, EditPost);

module.exports = postRoute;
