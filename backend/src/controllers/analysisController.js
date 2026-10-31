// Analysis Controller
// Handles resume-JD analysis using ML (HuggingFace semantic similarity)

const Analysis = require('../models/Analysis');
const Resume = require('../models/Resume');
const JobDescription = require('../models/JobDescription');
const { analyzeResumeWithML } = require('../utils/mlAnalyzer');

/**
 * Analyze resume against job description using ML (OPTIMIZED)
 * @route POST /api/analysis/analyze
 */
const analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescriptionId } = req.body;
    const userId = req.userId;

    // Validation
    if (!resumeId || !jobDescriptionId) {
      return res.status(400).json({ message: 'Resume ID and Job Description ID are required' });
    }

    // Fetch resume and job description (in parallel)
    console.log('📊 Fetching resume and job description...');
    const [resume, jobDescription] = await Promise.all([
      Resume.findOne({ _id: resumeId, userId }),
      JobDescription.findOne({ _id: jobDescriptionId, userId })
    ]);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (!jobDescription) {
      return res.status(404).json({ message: 'Job description not found' });
    }

    // Perform ML-based analysis with timing
    console.log('🤖 Starting ML analysis...');
    const startTime = Date.now();
    
    const mlAnalysis = await analyzeResumeWithML(
      resume.extractedText,
      jobDescription.description
    );

    const analysisTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Analysis completed in ${analysisTime}s`);

    // Save analysis to database
    const analysisRecord = new Analysis({
      userId,
      resumeId,
      jobDescriptionId,
      compatibilityScore: mlAnalysis.compatibilityScore,
      matchedSkills: mlAnalysis.matchedSkills,
      missingSkills: mlAnalysis.missingSkills,
      suggestions: mlAnalysis.suggestions,
      totalRequiredSkills: mlAnalysis.missingSkills.length + mlAnalysis.matchedSkills.length,
      totalMatchedSkills: mlAnalysis.matchedSkills.length,
      modelUsed: mlAnalysis.modelUsed || 'HuggingFace Semantic Similarity',
      sectionScores: mlAnalysis.sectionScores || {}
    });

    await analysisRecord.save();

    res.status(201).json({
      message: 'ML analysis completed successfully',
      analysis: {
        _id: analysisRecord._id,
        compatibilityScore: analysisRecord.compatibilityScore,
        matchedSkills: analysisRecord.matchedSkills,
        missingSkills: analysisRecord.missingSkills,
        suggestions: analysisRecord.suggestions,
        totalRequiredSkills: analysisRecord.totalRequiredSkills,
        totalMatchedSkills: analysisRecord.totalMatchedSkills,
        modelUsed: analysisRecord.modelUsed,
        sectionScores: analysisRecord.sectionScores,
        jobTitle: jobDescription.jobTitle,
        companyName: jobDescription.companyName,
        createdAt: analysisRecord.createdAt
      }
    });
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ message: 'Error analyzing resume', error: err.message });
  }
};

/**
 * Get analysis history for user
 * @route GET /api/analysis/history
 */
const getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const analyses = await Analysis.find({ userId })
      .populate('resumeId', 'fileName')
      .populate('jobDescriptionId', 'jobTitle companyName')
      .sort({ createdAt: -1 });

    res.json({
      count: analyses.length,
      analyses
    });
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ message: 'Error fetching analysis history', error: err.message });
  }
};

/**
 * Get specific analysis
 * @route GET /api/analysis/:id
 */
const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const analysis = await Analysis.findOne({ _id: id, userId })
      .populate('resumeId')
      .populate('jobDescriptionId');

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    res.json({ analysis });
  } catch (err) {
    console.error('Get analysis error:', err);
    res.status(500).json({ message: 'Error fetching analysis', error: err.message });
  }
};

/**
 * Get quick analysis (without saving) using ML
 * @route POST /api/analysis/quick
 */
const quickAnalysis = async (req, res) => {
  try {
    const { resumeText, jobDescriptionText } = req.body;

    // Validation
    if (!resumeText || !jobDescriptionText) {
      return res.status(400).json({ message: 'Resume text and job description text are required' });
    }

    // Perform ML-based analysis
    console.log('🤖 Starting quick ML analysis...');
    const mlAnalysis = await analyzeResumeWithML(resumeText, jobDescriptionText);

    res.json({
      compatibilityScore: mlAnalysis.compatibilityScore,
      matchedSkills: mlAnalysis.matchedSkills,
      missingSkills: mlAnalysis.missingSkills,
      suggestions: mlAnalysis.suggestions,
      totalRequiredSkills: mlAnalysis.missingSkills.length + mlAnalysis.matchedSkills.length,
      totalMatchedSkills: mlAnalysis.matchedSkills.length,
      modelUsed: mlAnalysis.modelUsed,
      confidence: mlAnalysis.confidence
    });
  } catch (err) {
    console.error('Quick analysis error:', err);
    res.status(500).json({ message: 'Error performing quick analysis', error: err.message });
  }
};

module.exports = {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
  quickAnalysis
};
