// Resume Model
// Schema for storing uploaded resumes and extracted data

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx'],
    required: true
  },
  extractedText: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    lowercase: true
  }],
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  fileSize: {
    type: Number // in bytes
  }
});

// Index for faster queries
resumeSchema.index({ userId: 1, uploadedAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
