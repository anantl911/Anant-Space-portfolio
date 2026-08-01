import { S3Client } from "@aws-sdk/client-s3";
import { filebaseConfig } from "./config.js";

const s3 = new S3Client({
    endpoint: filebaseConfig.endpoint,
    region: 'auto',
    credentials: {
        accessKeyId: filebaseConfig.accessKeyId,
        secretAccessKey: filebaseConfig.secretAccessKey
    },
});

export default s3;