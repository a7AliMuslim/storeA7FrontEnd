import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.REACT_APP_endpointS3,
    credentials: {
        accessKeyId: process.env.REACT_APP_accessKeyID,
        secretAccessKey: process.env.REACT_APP_secretAccessKey,
    }
});

export default s3;
