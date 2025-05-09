// Copyright 2025 fortu
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes'); // Adjust the path to your auth routes
const resumeRoutes = require('./routes/resumeRoutes'); // Adjust the path to your resume routes 

const app = express();

// Middleware to handle CORS
app.use(cors({
    origin: process.env.CLIENT_URL ||'*', // Allow all origins (you can specify a specific origin if needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// ConnectDB is a placeholder for your database connection logic
connectDB(); 

// Middleware to parse JSON bodies
app.use(express.json()); // Parse JSON bodies


// Register routes
app.use('/api/auth', authRoutes); // Adjust the path to your auth routes
app.use('/api/resume', resumeRoutes); // Adjust the path to your resume routes

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});