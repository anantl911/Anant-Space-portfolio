export const filebaseConfig = {
    endpoint: process.env.FILEBASE_ENDPOINT!,
    accessKeyId: process.env.FILEBASE_ACCESS_KEY!,
    secretAccessKey: process.env.FILEBASE_SECRET_KEY!,
    region: 'auto'!,
    signatureVersion: 'v4'!,
};