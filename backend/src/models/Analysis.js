// Analysis Model
// Schema for storing resume-JD analysis results

const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  jobDescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobDescription',
    required: true
  },
  compatibilityScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  matchedSkills: [{
    type: String,
    lowercase: true
  }],
  missingSkills: [{
    type: String,
    lowercase: true
  }],
  suggestions: [{
    type: String
  }],
  totalRequiredSkills: {
    type: Number,
    required: true
  },
  totalMatchedSkills: {
    type: Number,
    required: true
  },
  modelUsed: {
    type: String,
    default: 'HuggingFace Semantic Similarity',
    enum: ['HuggingFace Semantic Similarity', 'Keyword Matching']
  },
  sectionScores: {
    skills: Number,
    experience: Number,
    education: Number,
    contact: Number
  },
  confidence: {
    type: String,
    default: '80%'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
analysisSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Analysis', analysisSchema);
