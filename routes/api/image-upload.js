const express = require("express");
const router = express.Router();

const upload = require("../../services/file-upload");

const singleUpload = upload.single("image");

router.post("/image-upload", (req, res) => {
  singleUpload(req, res, err => {
    return res.json({ imageUrl: req.file.key });
  });
});

module.exports = singleUpload;
