import {
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import type {
    ListObjectsV2CommandOutput,
    _Object
} from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import filebaseInstance from '../instance.js';

const BUCKET_ID = process.env.BUCKET_ID || 'game-bucket';

/**
 * Generate a pre-signed URL for uploading a file (lasts 5 mins).
 */
export const preSignUpload = async (filename: string): Promise<string> => {
    return await getSignedUrl(
        filebaseInstance,
        new PutObjectCommand({
            Bucket: BUCKET_ID,
            Key: `games/${filename}`,
            ContentType: 'application/zip',
        }),
        { expiresIn: 300 }, // 5 mins
    );
};

/**
 * Generate a pre-signed URL for downloading/playing a file.
 */
export const preSignDownload = async (key: string, expiresSeconds: number = 300): Promise<string> => {
    return await getSignedUrl(
        filebaseInstance,
        new GetObjectCommand({
            Bucket: BUCKET_ID,
            Key: key,
        }),
        { expiresIn: expiresSeconds },
    );
};

/**
 * Delete a single file from Filebase S3.
 */
export const deleteS3File = async (key: string): Promise<void> => {
    try {
        await filebaseInstance.send(new DeleteObjectCommand({
            Bucket: BUCKET_ID,
            Key: key,
        }));
    } catch (err) {
        console.error(`Failed to delete S3 file: ${key}`, err);
    }
};

/**
 * Delete all files under a prefix recursively from Filebase S3.
 */
export const deleteS3Folder = async (prefix: string): Promise<void> => {
    try {
        let continuationToken: string | undefined = undefined;
        do {
            const listRes: ListObjectsV2CommandOutput = await filebaseInstance.send(new ListObjectsV2Command({
                Bucket: BUCKET_ID,
                Prefix: prefix,
                ContinuationToken: continuationToken,
            }));

            if (listRes.Contents && listRes.Contents.length > 0) {
                const objectsToDelete = listRes.Contents
                    .filter((obj: _Object) => obj.Key !== undefined)
                    .map((obj: _Object) => ({ Key: obj.Key as string }));

                if (objectsToDelete.length > 0) {
                    await filebaseInstance.send(new DeleteObjectsCommand({
                        Bucket: BUCKET_ID,
                        Delete: {
                            Objects: objectsToDelete,
                        },
                    }));
                }
            }

            continuationToken = listRes.NextContinuationToken;
        } while (continuationToken);
    } catch (err) {
        console.error(`Failed to delete S3 folder: ${prefix}`, err);
    }
};

/**
 * List all files under a prefix in the bucket and build a game manifest.
 * Returns file paths relative to the prefix, total size, and the detected entry point.
 */
export const listFiles = async (
    prefix: string
): Promise<{ entry: string; files: string[]; totalSize: number }> => {
    const files: string[] = [];
    let totalSize = 0;
    let continuationToken: string | undefined = undefined;

    do {
        const listRes: ListObjectsV2CommandOutput = await filebaseInstance.send(new ListObjectsV2Command({
            Bucket: BUCKET_ID,
            Prefix: prefix,
            ContinuationToken: continuationToken,
        }));

        if (listRes.Contents) {
            for (const obj of listRes.Contents) {
                if (!obj.Key) continue;

                const relativePath = obj.Key.replace(prefix, '');
                if (!relativePath) continue;

                files.push(relativePath);
                totalSize += obj.Size ?? 0;
            }
        }

        continuationToken = listRes.NextContinuationToken;
    } while (continuationToken);

    if (files.length === 0) {
        throw new Error('No files found under the given prefix.');
    }

    const entry = files.find(f => f.toLowerCase() === 'index.html') ||
        files.find(f => f.toLowerCase().endsWith('.html') && !f.includes('/')) ||
        files.find(f => f.toLowerCase().endsWith('.html')) ||
        'index.html';

    return { entry, files, totalSize };
};

