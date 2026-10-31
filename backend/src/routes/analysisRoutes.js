// Analysis Routes
// Routes for resume analysis and skill matching

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
  quickAnalysis
} = require('../controllers/analysisController');

/**
 * POST /api/analysis/analyze
 * Analyze a resume against a job description
 */
router.post('/analyze', authMiddleware, analyzeResume);

/**
 * GET /api/analysis/history
 * Get analysis history for the user
 */
router.get('/history', authMiddleware, getAnalysisHistory);

/**
 * GET /api/analysis/:id
 * Get specific analysis by ID
 */
router.get('/:id', authMiddleware, getAnalysisById);

/**
 * POST /api/analysis/quick
 * Quick analysis without saving (for testing)
 */
router.post('/quick', authMiddleware, quickAnalysis);

module.exports = router;
