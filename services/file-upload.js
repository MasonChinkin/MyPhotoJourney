const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const keys = require("../config/keys");

aws.config.update({
  secretAccessKey: keys.awsSecretAccessKey,
  accessKeyId: keys.awsAccessKeyId,
  region: "us-east-2"
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: keys.S3Bucket,
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
