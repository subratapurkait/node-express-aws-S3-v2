const AWS = require('aws-sdk')
const express = require('express');
const multer = require('multer');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// multer({ storage: storage }) for buffer storage

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
function createBucket(){
// create bucket
    s3.createBucket({
        Bucket: Bucket
    }, (error, success)=>{
        if (error) {
            console.log(error);
        }
        console.log(success);
    });
}

function deleteObject(Bucket, Key){
// delete object
    s3.deleteObject({
        Bucket: Bucket,
        Key: Key
    }, (error, success)=>{
        if (error) {
            console.log(error);
        }
        console.log(success);
    });
}
  
function deleteBucket(Bucket){
// delete bucket
    s3.deleteBucket({
        Bucket: Bucket
    }, (error, success)=>{
        if (error) {
            console.log(error);
        }
        console.log(success);
    });
}
    
app.get('/', (req, res) => {
    // const arr = ['hrithik.jpg', 'hrx.jpeg', 'shubro.jpg']
    // arr.forEach(e=>deleteObject(Bucket, e))
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), (req, res) => {
  const fileBuffer = req.file.buffer;

  s3.putObject({
    Bucket: Bucket,
    Key: req.file.originalname,
    Body: fileBuffer

  }, (err, success)=>{
    if(err) console.log(err)
    console.log(success);
    res.json({data: success})
  })
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
