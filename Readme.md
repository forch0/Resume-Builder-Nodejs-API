<!--
 Copyright 2025 fortu
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     https://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

# Resume Builder API

![Resume Builder API](https://img.icons8.com/ios-filled/50/000000/resume.png)

## Overview

This is a backend API for a Resume Builder application built using **Node.js**, **Express**, and **MongoDB**. The API allows users to create, update, delete, and fetch resumes. It includes user authentication, file upload support, and CRUD functionality for resume data such as profile info, education, work experience, projects, and more.

## Features

- 🛡️ **User authentication** using JWT.
- 📝 **Create**, **Read**, **Update**, and **Delete** resumes.
- 📷 **Upload profile image** for resumes.
- 🔒 Secure routes with middleware to protect sensitive endpoints.
- 🎨 Supports creating resumes with a predefined template.
- ✅ Validate and handle resume data in the backend.

## Requirements

- **Node.js**: 12.x or higher.
- **MongoDB**: A running instance or use **MongoDB Atlas**.
- **Nodemon**: Optional for development (for automatic server restart).

## Technologies Used

- **Node.js**: JavaScript runtime environment for building the API.
- **Express**: Web framework for Node.js used to handle routing and middleware.
- **MongoDB**: NoSQL database used for storing resume data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, used for schema and query building.
- **JWT (JSON Web Token)**: Token-based authentication for user login and authorization.
- **Multer**: Middleware for handling multipart form-data, which is used for file uploads.

- **HTTPie**: API Testing with httpie

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/resume-builder-api.git
    ```

2. **Install dependencies**:
    Navigate to the project folder and run the following command to install the required dependencies:
    ```bash
    npm install
    ```

3. **Create a `.env` file**:
    You need to create a `.env` file in the root of the project to store sensitive information like the MongoDB connection string and JWT secret key.

    Example `.env` file:
    ```env
    MONGO_URI=mongodb://localhost:27017/resumeBuilder
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

4. **Start the server**:
    Once the dependencies are installed, you can start the server by running:
    ```bash
    npm start
    ```

    For development, you can use **Nodemon** for auto-restarting the server:
    ```bash
    npm run dev
    ```

    The server should now be running at `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST /api/auth/login**: User login (requires email and password).
- **POST /api/auth/register**: User registration (requires email, password, and other details).
- **GET /api/auth/profile**: Get the logged-in user's profile (protected route).

### Resume Endpoints

- **POST /api/resumes**: Create a new resume (protected route).
- **GET /api/resumes**: Get all resumes (protected route).
- **GET /api/resumes/:id**: Get a specific resume by ID (protected route).
- **PUT /api/resumes/:id**: Update a specific resume by ID (protected route).
- **DELETE /api/resumes/:id**: Delete a specific resume by ID (protected route).

### File Upload (Optional)

- **POST /api/resumes/:id/upload**: Upload profile image for the resume (protected route).

## Middleware

### Protect Middleware

The **`protect`** middleware ensures that only authenticated users can access certain routes. It checks for a valid JWT token and verifies the user's identity.

### Upload Middleware

The **`uploadResumeImages`** middleware handles file uploads, ensuring that only allowed file types are uploaded and that the size does not exceed the set limit.

