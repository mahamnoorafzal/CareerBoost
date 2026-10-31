// Resume Routes
// Routes for resume upload and job description management

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const {
  uploadResume,
  getResumes,
  getResumeById,
  saveJobDescription,
  getJobDescriptions,
  deleteResume
} = require('../controllers/resumeController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files allowed'));
    }
  }
});

/**
 * POST /api/resume/upload
 * Upload a resume file
 */
router.post('/upload', authMiddleware, upload.single('resume'), uploadResume);

/**
 * GET /api/resume/list
 * Get all resumes for the user
 */
router.get('/list', authMiddleware, getResumes);

/**
 * POST /api/resume/job-description
 * Save a job description
 */
router.post('/job-description', authMiddleware, saveJobDescription);

/**
 * GET /api/resume/job-descriptions
 * Get all job descriptions for the user
 */
router.get('/job-descriptions', authMiddleware, getJobDescriptions);

/**
 * GET /api/resume/:id
 * Get specific resume by ID
 */
router.get('/:id', authMiddleware, getResumeById);

/**
 * DELETE /api/resume/:id
 * Delete a resume
 */
router.delete('/:id', authMiddleware, deleteResume);

module.exports = router;
