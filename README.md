File-Hosting-API

This is a Back-End project for creating file hosting API that accepts any type of file, uploads it to a hosting service, and returns the hosted file’s URL. In this API, Cloudinary was used as the file hosting service. When a file is uploaded to Cloudinary via Postman, the API will return the file's hosted URL along with metadata (e.g., file size, type) and store the metadata in a mongodb database. Cloudinary CLOUD NAME, CLOUDINARY API KEY and CLOUDINARY API SECRET, there credentials were used to access the Cloudinary server for file hosting.


**The stacks and tools used in this project are described below:**
- Node.js + Express.js + Mongoose
-  This project was developed using Node.js-based express.js Framework using mongoose ODM.
-  Used Multer for handling file uploads.
-  Used Postman for testing the API.
-  Implemented JWT Bearer Token as middleware for authentication.
-  Validated file types and sizes.
