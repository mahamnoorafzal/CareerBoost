// ML-Based Resume Analysis using HuggingFace Transformers (OPTIMIZED)
// Uses semantic similarity for intelligent CV scoring with caching

const { pipeline, env } = require('@xenova/transformers');

// Optimize model caching and loading
env.allowLocalModels = true;
env.allowRemoteModels = true;
env.cacheDir = './models';

// Keep model in memory to avoid reloading
let extractor = null;
let modelLoading = false;

/**
 * Initialize ML models (cached in memory)
 * Downloads semantic similarity model once and reuses
 */
const initializeModels = async () => {
  // Return if already loaded
  if (extractor) {
    return extractor;
  }

  // Wait if already loading (prevent race conditions)
  if (modelLoading) {
    let waitCount = 0;
    while (!extractor && waitCount < 300) { // Wait max 30 seconds
      await new Promise(resolve => setTimeout(resolve, 100));
      waitCount++;
    }
    if (extractor) return extractor;
  }

  try {
    modelLoading = true;
    console.log('🤖 Loading HuggingFace semantic similarity model...');
    console.log('⏳ This may take 1-5 minutes on first run (one-time only)');
    
    // Using distilbert for feature extraction (smaller, faster)
    extractor = await pipeline('feature-extraction', 'Xenova/distilbert-base-uncased');
    
    console.log('✅ Semantic model loaded successfully and cached');
    console.log('⚡ Future analyses will be fast (<3 seconds)');
    modelLoading = false;
    return extractor;
  } catch (error) {
    modelLoading = false;
    console.error('❌ Error loading ML model:', error);
    throw new Error('Failed to initialize ML model');
  }
};

/**
 * Calculate semantic similarity between two texts
 * Uses cosine similarity on embeddings
 * @param {string} text1 - Resume text
 * @param {string} text2 - Job description text
 * @returns {Promise<number>} - Similarity score (0-100)
 */
const calculateSemanticSimilarity = async (text1, text2) => {
  try {
    const model = await initializeModels();

    // Extract embeddings for both texts
    const embedding1 = await model(text1, { pooling: 'mean', normalize: true });
    const embedding2 = await model(text2, { pooling: 'mean', normalize: true });

    // Get raw data
    const vec1 = embedding1.data;
    const vec2 = embedding2.data;

    // Calculate cosine similarity
    let dotProduct = 0;
    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
    }

    // Cosine similarity ranges from -1 to 1, convert to 0-100
    const similarity = (dotProduct + 1) / 2; // Normalize to 0-1
    const score = Math.round(similarity * 100);

    return Math.max(0, Math.min(100, score)); // Clamp between 0-100
  } catch (error) {
    console.error('Error calculating similarity:', error);
    return 0;
  }
};

/**
 * Advanced ML-based resume analysis
 * Compares resume with job description using semantic similarity
 * @param {string} resumeText - Full resume text
 * @param {string} jobDescription - Full job description
 * @returns {Promise<Object>} - Analysis results with score and insights
 */
const analyzeResumeWithML = async (resumeText, jobDescription) => {
  try {
    // Ensure models are loaded
    await initializeModels();

    // Clean texts
    const cleanResume = resumeText
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
    const cleanJD = jobDescription
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();

    // Calculate overall compatibility score using semantic similarity
    let compatibilityScore = await calculateSemanticSimilarity(
      cleanResume,
      cleanJD
    );

    // Extract key sections for detailed analysis
    const resumeSections = extractSections(cleanResume);
    const jdRequirements = extractRequirements(cleanJD);

    // Analyze each section for detailed scoring
    const sectionScores = {};
    if (resumeSections.skills && jdRequirements.length > 0) {
      sectionScores.skills = await calculateSemanticSimilarity(
        resumeSections.skills,
        jdRequirements.join(' ')
      );
    }

    if (resumeSections.experience && cleanJD.includes('experience')) {
      sectionScores.experience = await calculateSemanticSimilarity(
        resumeSections.experience,
        'required experience'
      );
    }

    // Extract skills from both resume and JD
    const resumeSkills = extractSkills(resumeText);
    const requiredSkills = extractSkills(jobDescription);

    // Find matching and missing skills
    const matchedSkills = resumeSkills.filter(skill =>
      requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(req.toLowerCase()))
    );

    const missingSkills = requiredSkills.filter(skill =>
      !resumeSkills.some(res => skill.toLowerCase().includes(res.toLowerCase()) ||
        res.toLowerCase().includes(skill.toLowerCase()))
    );

    // Generate recommendations based on analysis
    const suggestions = generateSuggestions(
      missingSkills,
      sectionScores,
      compatibilityScore
    );

    return {
      compatibilityScore: Math.round(compatibilityScore),
      matchedSkills: [...new Set(matchedSkills)],
      missingSkills: [...new Set(missingSkills)],
      sectionScores,
      suggestions,
      modelUsed: 'HuggingFace Semantic Similarity',
      confidence: Math.round(compatibilityScore / 10) + '0%' // Confidence indicator
    };
  } catch (error) {
    console.error('Error in ML analysis:', error);
    throw new Error('ML analysis failed: ' + error.message);
  }
};

/**
 * Extract major sections from resume
 * @param {string} text - Resume text
 * @returns {Object} - Extracted sections
 */
const extractSections = (text) => {
  const sections = {
    skills: '',
    experience: '',
    education: '',
    contact: ''
  };

  // Extract skills section
  const skillsMatch = text.match(
    /(?:skills?|competencies?|abilities?)[:\s]+([\s\S]*?)(?=\n\n|\nwork|job|\neducation|$)/i
  );
  if (skillsMatch) sections.skills = skillsMatch[1];

  // Extract experience section
  const expMatch = text.match(
    /(?:work|professional|job)[\s\S]*?(?:experience|history)[:\s]+([\s\S]*?)(?=\neducation|$)/i
  );
  if (expMatch) sections.experience = expMatch[1];

  // Extract education section
  const eduMatch = text.match(
    /(?:education|degree|university)[:\s]+([\s\S]*?)(?=\nskills|$)/i
  );
  if (eduMatch) sections.education = eduMatch[1];

  return sections;
};

/**
 * Extract job requirements from job description
 * @param {string} jobDescription - Job description text
 * @returns {Array} - List of requirements
 */
const extractRequirements = (jobDescription) => {
  const requirements = [];

  // Extract bullets and numbered lists
  const bulletMatch = jobDescription.match(
    /(?:requirements?|qualifications?|responsibilities?)[:\s]+([\s\S]*?)(?=\n\n|$)/i
  );

  if (bulletMatch) {
    const text = bulletMatch[1];
    const items = text.split('\n').filter(line => line.trim().length > 5);
    requirements.push(...items);
  }

  return requirements;
};

/**
 * Extract technical skills from text
 * Uses pattern matching for common tech keywords
 * @param {string} text - Text to analyze
 * @returns {Array} - Detected skills
 */
const extractSkills = (text) => {
  const skills = [];
  const skillPatterns = [
    // Programming languages
    /\b(python|javascript|java|c\+\+|c#|ruby|php|swift|kotlin|go|rust|typescript)\b/gi,
    // Frameworks
    /\b(react|angular|vue|django|flask|spring|express|node\.js|laravel|rails)\b/gi,
    // Databases
    /\b(mongodb|mysql|postgresql|sqlite|redis|cassandra|elasticsearch)\b/gi,
    // Cloud platforms
    /\b(aws|azure|gcp|heroku|docker|kubernetes)\b/gi,
    // Tools and others
    /\b(git|github|gitlab|jenkins|linux|windows|mac|sql|html|css|rest api)\b/gi
  ];

  skillPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const skill = match[1];
      if (skill && !skills.includes(skill)) {
        skills.push(skill);
      }
    }
  });

  return skills;
};

/**
 * Generate personalized suggestions based on analysis
 * @param {Array} missingSkills - Skills not in resume
 * @param {Object} sectionScores - Scores for each section
 * @param {number} compatibilityScore - Overall score
 * @returns {Array} - List of recommendations
 */
const generateSuggestions = (missingSkills, sectionScores, compatibilityScore) => {
  const suggestions = [];

  // Score-based suggestions
  if (compatibilityScore >= 80) {
    suggestions.push('Excellent match! Your resume aligns well with the job requirements.');
  } else if (compatibilityScore >= 60) {
    suggestions.push('Good match. Consider highlighting relevant experience more prominently.');
  } else if (compatibilityScore >= 40) {
    suggestions.push('Moderate match. You may need to develop some additional skills.');
  } else {
    suggestions.push('Limited match currently. Consider gaining experience in required areas.');
  }

  // Skills-based suggestions
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3).join(', ');
    suggestions.push(`Priority skills to develop: ${topMissing}`);
  }

  // Experience suggestions
  if (sectionScores.experience && sectionScores.experience < 50) {
    suggestions.push('Consider gaining more relevant professional experience in this domain.');
  }

  // Skills section suggestions
  if (sectionScores.skills && sectionScores.skills < 50) {
    suggestions.push('Expand your skills section to better match job requirements.');
  }

  // General tips
  if (compatibilityScore < 70) {
    suggestions.push('Take online courses or certifications in the required technology stack.');
  }

  suggestions.push('Tailor your resume to highlight the most relevant experience for this role.');

  return suggestions;
};

/**
 * Quick comparison of two texts without full ML model
 * Uses keyword overlap for speed
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {number} - Quick similarity score (0-100)
 */
const quickSimilarity = (text1, text2) => {
  const words1 = new Set(text1.toLowerCase().match(/\b\w+\b/g) || []);
  const words2 = new Set(text2.toLowerCase().match(/\b\w+\b/g) || []);

  // Calculate Jaccard similarity
  const intersection = [...words1].filter(w => words2.has(w)).length;
  const union = new Set([...words1, ...words2]).size;

  return Math.round((intersection / union) * 100);
};

module.exports = {
  analyzeResumeWithML,
  calculateSemanticSimilarity,
  extractSkills,
  extractSections,
  extractRequirements,
  generateSuggestions,
  initializeModels,
  quickSimilarity
};
