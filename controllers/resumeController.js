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
const path = require('node:path');
const Resume = require('../models/Resume'); // Adjust the path to your Resume model

// @desc    Create a new resume
// @route   POST /api/resumes/:id/upload
// @access  Private
const createResume = async (req, res) => {
    try {
        const { title, thumbnailLink } = req.body; // Get the title and thumbnailLink from the request body

        // Default template with an updated structure for interests and thumbnailLink
        const defaultResumeData = {
            profileInfo: {
                profileImage: null,
                previewImage: "",
                fullname: "",
                designation: "",
                summary: "",
            },
            contactInfo: {
                email: "",
                phone: "",
                address: "",
                website: "",
                socialLinks: {
                    linkedin: "",
                    github: "",
                    twitter: "",
                    facebook: "",
                    instagram: ""
                }
            },
            workExperiece: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                }
            ],
            education: [
                {
                    institution: "",
                    degree: "",
                    startDate: "",
                    endDate: ""
                }
            ],
            skills: [
                {
                    name: "",
                    progress: 0,
                }
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                }
            ],
            certifications: [
                {
                    title: "",
                    issuer: "",
                    year: "",
                }
            ],
            languages: [
                {
                    name: "",
                    progress: 0,
                }
            ],
            interests: [{ name: "" }],  // Ensuring the correct object structure for interests
        };

        // Check if thumbnailLink is provided in the body, if not set a default or handle accordingly
        if (!thumbnailLink) {
            return res.status(400).json({ message: 'Thumbnail link is required.' });
        }

        // Create a new resume with the default data and title
        const newResume = await Resume.create({
            userId: req.user._id, // Get the logged-in user's ID from the request
            title: title || "My Resume", // Default to "My Resume" if no title is provided
            thumbnailLink: thumbnailLink, // Pass the thumbnail link from the request
            ...defaultResumeData, // Use the default resume data
        });

        res.status(201).json(newResume); // Respond with the created resume

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all resumes for logged-in user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
    const userId = req.user._id; // Get the logged-in user's ID from the request

    try {
        const resumes = await Resume.find({ user: userId }); // Find all resumes for the logged-in user

        res.status(200).json(resumes); // Respond with the found resumes
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @ desc    Get single resume by ID
// @ route   GET /api/resumes/:id
// @ access  Private
const getResumeById = async (req, res) => {
    const { id } = req.params; // Get the resume ID from the request parameters

    try {
        const resume = await Resume.findById(id); // Find the resume by ID

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' }); // Respond with 404 if not found
        }

        res.status(200).json(resume); // Respond with the found resume
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
    const { id } = req.params; // Get the resume ID from the request parameters
    const { title, description } = req.body; // Get the title and description from the request body

    try {
        const resume = await Resume.findById(id); // Find the resume by ID

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' }); // Respond with 404 if not found
        }

        // Update the resume fields
        resume.title = title || resume.title;
        resume.description = description || resume.description;

        if (req.file) {
            // If a new file is uploaded, update the file path
            resume.resume = req.file.path;
        }

        await resume.save(); // Save the updated resume to the database

        res.status(200).json(resume); // Respond with the updated resume
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    const { id } = req.params; // Get the resume ID from the request parameters

    try {
        const resume = await Resume.findById(id); // Find the resume by ID

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' }); // Respond with 404 if not found
        }

        // Delete the file from the server
        fs.unlinkSync(path.join(__dirname, '..', resume.resume)); // Adjust the path to your file location

        await resume.remove(); // Remove the resume from the database

        res.status(200).json({ message: 'Resume deleted successfully' }); // Respond with success message
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
};