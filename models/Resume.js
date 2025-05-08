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

const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        thumbnailLink: { type: String, required: true },
        template:{theme: String, color: String},
        profileInfo:{profilePreview: String, fullName: String, designation: String, summary: String },
        contactInfo:{email: String, phone: String, location:String, address: String, website: String, linkedin: String, github: String},
        workExperience: [
            {
                companyName: String,
                role: String,
                startDate: Date,
                endDate: Date,
                description: String,
            },
        ],
        education: [
            {
                degree: String,
                institution: String,
                startDate: Date,
                endDate: Date,
                
            },
        ],
        skills:[
            {
                name: String,
                progress: Number,
            }
        ],
        projects:[
            {
                title: String,
                description: String,
                github: String,
                liveDemo: String,
            }
        ],
        certifications:[
            {
                title: String,
                issuer: String,
                year: String,
            }
        ],
        interests:[
            {
                name: String,
            }
        ],  
    },
    { 
        timestamps: {createdAt: "CreatedAt", UpdatedAt: "UpdatedAt"},
     }
);

module.exports = mongoose.model('Resume', ResumeSchema);
