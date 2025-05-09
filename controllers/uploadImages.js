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

const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');
const upload = require('../middlewares/uploadMiddleware');

const uploadResumeImages = async (req, res) => {
    try{
        upload.fields([
            { name: 'thumbnail', maxCount: 1 },
            { name: 'profileImage', maxCount: 1 }
        ])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading images' });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findById(resumeId);

            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
            }

            if (req.files['resumeImage']) {
                const resumeImagePath = path.join(__dirname, '../uploads/resumes', req.files['resumeImage'][0].filename);
                resume.resumeImage = resumeImagePath;
            }

            if (req.files['coverImage']) {
                const coverImagePath = path.join(__dirname, '../uploads/covers', req.files['coverImage'][0].filename);
                resume.coverImage = coverImagePath;
            }

            await resume.save();
            return res.status(200).json({ message: 'Images uploaded successfully', resume });
        });
    } catch (error) {
        console.error('Error uploading images:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { uploadResumeImages };