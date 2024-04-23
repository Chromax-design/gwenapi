const { v4: uuidv4 } = require("uuid");
const { InsertData, SelectData, UpdateData } = require("../utils/SqlFunctions");

const GetAllPosts = async (req, res) => {
  const allPosts = await SelectData("posts");
  return res.status(200).json(allPosts);
};

const GetPost = async (req, res) => {
  const { postId } = req.params;
  const post = await SelectData("posts", "uuid", postId);
  res.status(200).json(post[0]);
};

const CreatePost = async (req, res) => {
  const data = req.body;
  const imgFilename = req.file.filename;
  const postData = {
    uuid: uuidv4(),
    image: imgFilename,
    ...data,
  };

  try {
    await InsertData(postData, "posts");
    res.status(200).json("Post created successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

const EditPost = async (req, res) => {
  const { postId } = req.params;
  const { image, ...rest } = req.body;
  const imageUrl = req.file ? req.file.filename : image;

  const formData = {
    uuid: postId,
    image: imageUrl,
    ...rest,
  };
  try {
    await UpdateData("posts", formData, "uuid", postId);
    res.status(200).json("Post updated successfully");
  } catch (error) {
    console.error(error);
    res.send(500).json("Internal server error");
  }
  res.status(200).json();
};

module.exports = {
  GetAllPosts,
  GetPost,
  CreatePost,
  EditPost,
};
