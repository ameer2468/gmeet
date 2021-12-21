import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID,
})
export const s3 = new AWS.S3({
    params: {Bucket: 'gmeet-images'},
    region: 'us-east-1',
    signatureVersion: 'v4'
});