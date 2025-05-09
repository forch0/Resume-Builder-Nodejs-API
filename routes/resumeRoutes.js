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

const express = require('express');
const {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
} = require('../controllers/resumeController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createResume); // Create a new resume (protected route)
router.get('/', protect, getResumes); // Get all resumes (protected route)
router.get('/:id', protect, getResumeById); // Get a resume by ID (protected route)
router.put('/:id', protect, updateResume); // Update a resume (protected route)
// router.put('/:id/upload', protect, upload.single('resumeImage'), (req, res) => { 
//     try {
//         // Assuming uploadResumeImages is a function that processes the uploaded file
//         uploadResumeImages(req, res); 
//     } catch (err) {
//         if (err instanceof multer.MulterError) {
//             res.status(400).json({ message: `File upload error: ${err.message}` });
//         } else {
//             res.status(500).json({ message: `Server error: ${err.message}` });
//         }
//     }
// }); // Upload images for a resume (protected route)
router.delete('/:id', protect, deleteResume); // Delete a resume (protected route)

module.exports = router;
