# node-express-aws-sdk-S3

# Node.js Express and AWS SDK S3 (v2) File Upload Tutorial

This tutorial demonstrates how to build a simple Node.js Express application for file uploads to AWS S3 using the AWS SDK version 2 (v2).

## Prerequisites

- Node.js installed on your machine
- AWS S3 bucket set up (create one using the AWS Management Console if you haven't already)
- AWS IAM user with S3 access credentials (access key and secret key)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/subratapurkait/node-express-aws-sdk-S3.git
    cd node-express-aws-s3-v2
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the project root and add your AWS credentials:**

    ```env
    AWS_ACCESS_KEY_ID=your_access_key_id
    AWS_SECRET_ACCESS_KEY=your_secret_access_key
    AWS_REGION=your_s3_region
    S3_BUCKET_NAME=your_s3_bucket_name
    PORT=3000
    ```

4. **Start the application:**

    ```bash
    npm start
    ```

5. **Open your browser and navigate to http://localhost:3000 to access the application.**

## Usage

1. On the application's homepage, you'll find a simple form for file uploads.

2. Choose a file and click the "Upload" button.

3. The file will be uploaded to the specified AWS S3 bucket.

## Project Structure

- `app.js`: The main entry point for the Express application.
- `index.html`: the homepage.

## Dependencies

- express: ^4.18.2
- aws-sdk: ^2.1528.0
- dotenv: ^16.3.1
- multer: ^1.4.5-lts.1

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [AWS SDK for JavaScript v2](https://docs.aws.amazon.com/AWSJavaScriptSDK/v2/latest/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Subrata Purkait
subratapurkait08@gmail.com
