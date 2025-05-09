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

// utils/ApiPath.js

const ApiPath = {
    // Authentication paths
    auth: {
        register: '/api/auth/register',
        login: '/api/auth/login',
        profile: '/api/auth/profile',
    },

    // Resume paths
    resumes: {
        create: '/api/resumes',
        getAll: '/api/resumes',
        getById: (id) => `/api/resumes/${id}`,
        update: (id) => `/api/resumes/${id}`,
        delete: (id) => `/api/resumes/${id}`,
        uploadThumbnail: (id) => `/api/resumes/${id}/upload`, // for thumbnail upload
    },

    // Additional utility paths (if any)
    // Example: generic API path for file upload or other services
    fileUpload: '/api/files/upload',
};

module.exports = ApiPath;
// for front end