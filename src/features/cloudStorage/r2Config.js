import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: "auto",
    endpoint: 'https://fc9f35697ba94887a30ca08367a13fc3.r2.cloudflarestorage.com',
    credentials: {
        accessKeyId: '0d90fa2e5d382572566b30918e97b255',
        secretAccessKey: 'd81e813e03d23a0befb6f29fd6e907d4790267d61a3438867f7750bd839e1086',
    }
});

export default s3;
