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

import axios from 'axios';

// Define the base URL for your API
const BASE_URL = 'http://localhost:5000';  // Replace with your API base URL

// Create an Axios instance with the common configurations
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout for requests (10 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include JWT token in headers for authenticated requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage or sessionStorage

    if (token) {
      // Include token in Authorization header if available
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Token expired or user not authenticated
      console.log('Unauthorized, please login');
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { BASE_URL }; // Export the base URL if needed in other parts of your application