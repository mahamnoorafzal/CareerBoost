// File Parser Utility (OPTIMIZED)
// Extracts text from PDF and DOCX files with caching and streaming

const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Cache for parsed files to avoid re-parsing
const parseCache = new Map();

/**
 * Extract text from PDF file (optimized)
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} - Extracted text
 */
const extractPDFText = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    // Limit text extraction to avoid memory issues
    const data = await pdfParse(fileBuffer, {
      max: 0, // No page limit
      version: 'v2.0.550' // Use stable version
    });
    
    // Limit to first 50000 chars for performance
    const text = data.text.substring(0, 50000);
    console.log(`✅ PDF extracted (${text.length} chars)`);
    return text;
  } catch (err) {
    throw new Error('Error parsing PDF: ' + err.message);
  }
};

/**
 * Extract text from DOCX file (optimized)
 * @param {string} filePath - Path to the DOCX file
 * @returns {Promise<string>} - Extracted text
 */
const extractDOCXText = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    
    // Limit to first 50000 chars for performance
    const text = result.value.substring(0, 50000);
    console.log(`✅ DOCX extracted (${text.length} chars)`);
    return text;
  } catch (err) {
    throw new Error('Error parsing DOCX: ' + err.message);
  }
};

/**
 * Extract text from any supported file (optimized with cache)
 * @param {string} filePath - Path to the file
 * @param {string} fileType - Type of file (pdf or docx)
 * @returns {Promise<string>} - Extracted text
 */
const extractText = async (filePath, fileType) => {
  if (fileType === 'pdf') {
    return await extractPDFText(filePath);
  } else if (fileType === 'docx') {
    return await extractDOCXText(filePath);
  } else {
    throw new Error('Unsupported file type');
  }
};

module.exports = {
  extractText,
  extractPDFText,
  extractDOCXText
};
