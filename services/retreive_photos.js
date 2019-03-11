const aws = require("aws-sdk");
const keys = require("../config/keys");

async function getPhotos(journeyId = 1552) {
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      secretAccessKey: keys.awsSecretAccessKey,
      accessKeyId: keys.awsAccessKeyId,
      region: "us-east-2"
    });

    const s3 = new aws.S3();
    const response = await s3
      .listObjectsV2({
        Bucket: keys.S3Bucket,
        Prefix: `${journeyId}`
      })
      .promise();

    console.log(response);
  } catch (e) {
    console.log("our error", e);
  }
}

module.exports = getPhotos;
