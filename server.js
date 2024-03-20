const AWS = require('aws-sdk');
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
});

const s3 = new AWS.S3();

function encryptData(data, key) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

function decryptData(encryptedData, key) {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}

function uploadEncryptedFileToS3(filePath, bucketName, key, encryptionKey) {
    const fileContent = fs.readFileSync(filePath);
    const encryptedContent = encryptData(fileContent, encryptionKey);

    const params = {
        Bucket: bucketName,
        Key: key,
        Body: encryptedContent,
    };

    return s3.upload(params).promise();
}

function downloadEncryptedFileFromS3(bucketName, key, encryptionKey, filePath) {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    return new Promise((resolve, reject) => {
        s3.getObject(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const decryptedContent = decryptData(data.Body.toString(), encryptionKey);
                fs.writeFileSync(filePath, decryptedContent);
                resolve(filePath);
            }
        });
    });
}

const filePath = 'file.txt';
const bucketName = process.env.S3_BUCKET;
const key = 'file.txt';
const encryptionKey = 'JaiHind'; // Should be a 256-bit key

uploadEncryptedFileToS3(filePath, bucketName, key, encryptionKey)
    .then(data => {
        console.log('File uploaded successfully:', data.Location);
    })
    .catch(err => {
        console.error('Error uploading file:', err);
    });

const downloadPath = 'downloaded_file.txt';
downloadEncryptedFileFromS3(bucketName, key, encryptionKey, downloadPath)
    .then(filePath => {
        console.log('File downloaded successfully:', filePath);
    })
    .catch(err => {
        console.error('Error downloading file:', err);
    });
