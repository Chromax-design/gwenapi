const CheckImgSize = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const imgSize = req.file.size;
  if (imgSize > 1048576) {
    return res.status(400).send("Image file should be < 1mb");
  }
  next();
};

module.exports = {
  CheckImgSize,
};
