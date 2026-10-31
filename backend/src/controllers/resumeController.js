// Resume Controller
// Handles resume upload and job description storage

const Resume = require('../models/Resume');
const JobDescription = require('../models/JobDescription');
const { extractText } = require('../utils/fileParser');
const { extractSkills } = require('../utils/skillMatcher');
const fs = require('fs');
const path = require('path');

/**
 * Upload resume (Optimized)
 * @route POST /api/resume/upload
 */
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.userId;
    const file = req.file;

    // Validate file type
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      // Delete the file
      fs.unlinkSync(file.path);
      return res.status(400).json({ message: 'Only PDF and DOCX files are allowed' });
    }

    try {
      // Extract text from file (optimized)
      const fileType = file.mimetype === 'application/pdf' ? 'pdf' : 'docx';
      console.log(`📄 Parsing ${fileType.toUpperCase()} file...`);
      
      const startTime = Date.now();
      const extractedText = await extractText(file.path, fileType);
      const parseTime = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`✅ Parsing completed in ${parseTime}s`);

      // Extract skills (fast - keyword based)
      console.log(`🔍 Extracting skills...`);
      const skills = extractSkills(extractedText);
      console.log(`✅ Found ${skills.length} skills`);

      // Save to database
      const resume = new Resume({
        userId,
        fileName: file.originalname,
        filePath: file.path,
        fileType,
        extractedText,
        skills,
        fileSize: file.size
      });

      await resume.save();

      res.status(201).json({
        message: 'Resume uploaded successfully',
        resume: {
          _id: resume._id,
          fileName: resume.fileName,
          uploadedAt: resume.uploadedAt,
          skills: resume.skills,
          skillCount: resume.skills.length
        }
      });
    } catch (parseErr) {
      // Delete the file if parsing fails
      fs.unlinkSync(file.path);
      throw new Error('Failed to parse file: ' + parseErr.message);
    }
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Error uploading resume', error: err.message });
  }
};

/**
 * Get all resumes for user
 * @route GET /api/resume/list
 */
const getResumes = async (req, res) => {
  try {
    const userId = req.userId;
    const resumes = await Resume.find({ userId })
      .select('-extractedText') // Exclude large text field
      .sort({ uploadedAt: -1 });

    res.json({
      count: resumes.length,
      resumes
    });
  } catch (err) {
    console.error('Get resumes error:', err);
    res.status(500).json({ message: 'Error fetching resumes', error: err.message });
  }
};

/**
 * Get resume by ID
 * @route GET /api/resume/:id
 */
const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: id, userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ resume });
  } catch (err) {
    console.error('Get resume error:', err);
    res.status(500).json({ message: 'Error fetching resume', error: err.message });
  }
};

/**
 * Save job description (Optimized)
 * @route POST /api/resume/job-description
 */
const saveJobDescription = async (req, res) => {
  try {
    const { jobTitle, companyName, description } = req.body;
    const userId = req.userId;

    // Validation
    if (!jobTitle || !companyName || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Extract skills from job description (fast - keyword based)
    console.log(`📋 Processing job description for ${jobTitle}...`);
    const startTime = Date.now();
    const requiredSkills = extractSkills(description);
    const processTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Found ${requiredSkills.length} skills in ${processTime}s`);

    // Save to database
    const jd = new JobDescription({
      userId,
      jobTitle,
      companyName,
      description,
      requiredSkills
    });

    await jd.save();

    res.status(201).json({
      message: 'Job description saved successfully',
      jobDescription: {
        _id: jd._id,
        jobTitle: jd.jobTitle,
        companyName: jd.companyName,
        requiredSkills: jd.requiredSkills,
        skillCount: jd.requiredSkills.length,
        createdAt: jd.createdAt
      }
    });
  } catch (err) {
    console.error('Save JD error:', err);
    res.status(500).json({ message: 'Error saving job description', error: err.message });
  }
};

/**
 * Get all job descriptions for user
 * @route GET /api/resume/job-descriptions
 */
const getJobDescriptions = async (req, res) => {
  try {
    const userId = req.userId;
    const jobDescriptions = await JobDescription.find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      count: jobDescriptions.length,
      jobDescriptions
    });
  } catch (err) {
    console.error('Get JD error:', err);
    res.status(500).json({ message: 'Error fetching job descriptions', error: err.message });
  }
};

/**
 * Delete resume
 * @route DELETE /api/resume/:id
 */
const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const resume = await Resume.findOneAndDelete({ _id: id, userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Delete file from system
    if (fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error('Delete resume error:', err);
    res.status(500).json({ message: 'Error deleting resume', error: err.message });
  }
};

module.exports = {
  uploadResume,
  getResumes,
  getResumeById,
  saveJobDescription,
  getJobDescriptions,
  deleteResume
};
