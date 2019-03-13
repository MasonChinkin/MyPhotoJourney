const express = require("express");
const router = express.Router();

const upload = require("../../services/file-upload");

// const singleUpload = upload.single("image");

router.post("/image-upload", upload.single("image"), (req, res, err) => {
  return res.json({ imageUrl: req.file });
});

module.exports = router;
