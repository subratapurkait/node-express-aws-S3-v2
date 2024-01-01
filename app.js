const AWS = require('aws-sdk')
const express = require('express');
const multer = require('multer');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// multer({ storage: storage }) for buffer storage

app.set('view engine', 'ejs');
require('dotenv').config();
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;
const port = process.env.PORT;

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
});
function createBucket() {
    // create bucket
    s3.createBucket({
        Bucket: Bucket
    }, (error, success) => {
        if (error) {
            console.log(error);
        }
        console.log(success);
    });
}

function deleteObject(Bucket, Key) {
    // delete object
    const output = new Promise((resolve, reject) => {
        try {
            s3.deleteObject({
                Bucket: Bucket,
                Key: Key
            }, (error, success) => {
                if (error) {
                    console.log(error);
                }
                console.log(success);
            });
        } catch (error) {
            reject(error)
        }
    })
    return output;
}

function deleteBucket(Bucket) {
    // delete bucket
    s3.deleteBucket({
        Bucket: Bucket
    }, (error, success) => {
        if (error) {
            console.log(error);
        }
        console.log(success);
    });
}

function listObjects(Bucket) {

    var params = {
        Bucket: Bucket, /* required */
        // Prefix: 'folder name if any' 
    };
    const output = new Promise((resolve, reject) => {
        try {
            s3.listObjectsV2(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject(err) // an error occurred
                } else {
                    const imageBuffer = data.Contents;
                    const listData = imageBuffer.map(e => e.Key)
                    // console.log(listData);
                    resolve(listData)
                }
            });
        } catch (error) {
            reject(error)
        }
    })
    return output;
    // s3.getObject({
    //     Bucket: bucketName,
    //     Key: objectKey,
    // }, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    // }); 
}
app.get('/', async (req, res) => {
    // res.sendFile(__dirname + '/index.html');
     const data = await listObjects(Bucket);    //syntactic sugar async/await
     const listData = data;
     res.render('index', { listData })  

});

app.post('/', upload.single('file'), (req, res) => {
    const fileBuffer = req.file.buffer;

    s3.putObject({
        Bucket: Bucket,
        Key: req.file.originalname,
        Body: fileBuffer

    }, async (err, success) => {
        if (err) console.log(err)
        console.log(success);
        const data = await listObjects(Bucket);    //syntactic sugar async/await
        const listData = data;
        res.render('index', { listData })   
        // data.then(listData => res.render('index', { listData })).catch(err=> console.log(err)) // promise chaining method
    })
});

app.get('/delete', async (req, res, next) => {
    const data = await listObjects(Bucket);    //syntactic sugar async/await
    data.forEach(e=>deleteObject(Bucket, e))
    const listData = '';
    res.render('index', { listData })   
    next();
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
