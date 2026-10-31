// Skill Matching Utility
// Extracts and matches skills using keyword-based approach

// Predefined list of technical skills
const TECH_SKILLS = [
  // Programming Languages
  'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin',
  'golang', 'rust', 'typescript', 'scala', 'perl', 'r', 'matlab', 'bash', 'shell',
  
  // Web Technologies
  'react', 'vue', 'angular', 'node.js', 'express', 'django', 'flask', 'spring',
  'asp.net', 'html', 'css', 'jquery', 'webpack', 'babel', 'nextjs', 'nuxt',
  
  // Databases
  'mongodb', 'mysql', 'postgresql', 'oracle', 'sql', 'redis', 'cassandra',
  'elasticsearch', 'dynamodb', 'firebase',
  
  // Cloud & DevOps
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'gitlab-ci',
  'github-actions', 'terraform', 'ansible', 'cloudflare', 'heroku',
  
  // Testing & QA
  'jest', 'mocha', 'chai', 'selenium', 'junit', 'pytest', 'cucumber',
  
  // Tools & Platforms
  'git', 'github', 'gitlab', 'bitbucket', 'jira', 'slack', 'trello',
  'figma', 'photoshop', 'sketch', 'vscode', 'linux', 'windows',
  
  // Data & Analytics
  'tableau', 'power-bi', 'hadoop', 'spark', 'pandas', 'numpy', 'scikit-learn',
  
  // Soft Skills (basic)
  'communication', 'teamwork', 'leadership', 'problem-solving', 'project-management'
];

/**
 * Extract skills from text using keyword matching
 * @param {string} text - Text to extract skills from
 * @returns {Array<string>} - Array of found skills
 */
const extractSkills = (text) => {
  if (!text) return [];
  
  // Convert to lowercase and split into words
  const lowerText = text.toLowerCase();
  const foundSkills = new Set();
  
  // Match each skill in the text
  TECH_SKILLS.forEach(skill => {
    // Create regex to find whole word matches
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    if (regex.test(lowerText)) {
      foundSkills.add(skill);
    }
  });
  
  return Array.from(foundSkills);
};

/**
 * Calculate compatibility score between resume and job description
 * @param {Array<string>} resumeSkills - Skills found in resume
 * @param {Array<string>} requiredSkills - Skills required for job
 * @returns {Object} - Analysis object with score and matches
 */
const calculateCompatibility = (resumeSkills, requiredSkills) => {
  // Convert to lowercase for comparison
  const resumeSkillsLower = resumeSkills.map(s => s.toLowerCase());
  const requiredSkillsLower = requiredSkills.map(s => s.toLowerCase());
  
  // Find matching skills
  const matchedSkills = requiredSkillsLower.filter(skill => 
    resumeSkillsLower.includes(skill)
  );
  
  // Find missing skills
  const missingSkills = requiredSkillsLower.filter(skill => 
    !resumeSkillsLower.includes(skill)
  );
  
  // Calculate compatibility score (percentage)
  const totalRequired = requiredSkillsLower.length;
  const compatibilityScore = totalRequired > 0 
    ? Math.round((matchedSkills.length / totalRequired) * 100)
    : 0;
  
  return {
    compatibilityScore,
    matchedSkills,
    missingSkills,
    totalMatched: matchedSkills.length,
    totalRequired: totalRequired
  };
};

/**
 * Generate suggestions based on missing skills
 * @param {Array<string>} missingSkills - Skills that are missing
 * @returns {Array<string>} - Array of suggestions
 */
const generateSuggestions = (missingSkills) => {
  const suggestions = [];
  
  if (missingSkills.length === 0) {
    suggestions.push('✅ Your resume matches all required skills!');
    return suggestions;
  }
  
  // Group missing skills by category
  const categories = categorizeSkills(missingSkills);
  
  Object.entries(categories).forEach(([category, skills]) => {
    if (skills.length > 0) {
      suggestions.push(`📚 Learn ${category}: ${skills.join(', ')}`);
    }
  });
  
  suggestions.push('💡 Consider taking online courses to improve missing skills');
  suggestions.push('🎯 Focus on the most in-demand missing skills first');
  
  return suggestions;
};

/**
 * Categorize skills by type
 * @param {Array<string>} skills - Array of skills
 * @returns {Object} - Skills grouped by category
 */
const categorizeSkills = (skills) => {
  const categories = {
    'Programming Languages': [],
    'Web Frameworks': [],
    'Databases': [],
    'Cloud/DevOps': [],
    'Tools': [],
    'Other': []
  };
  
  const skillMap = {
    'javascript': 'Programming Languages',
    'python': 'Programming Languages',
    'java': 'Programming Languages',
    'c++': 'Programming Languages',
    'typescript': 'Programming Languages',
    'react': 'Web Frameworks',
    'angular': 'Web Frameworks',
    'vue': 'Web Frameworks',
    'node.js': 'Web Frameworks',
    'mongodb': 'Databases',
    'mysql': 'Databases',
    'postgresql': 'Databases',
    'aws': 'Cloud/DevOps',
    'docker': 'Cloud/DevOps',
    'kubernetes': 'Cloud/DevOps',
    'git': 'Tools',
    'github': 'Tools',
    'jira': 'Tools'
  };
  
  skills.forEach(skill => {
    const category = skillMap[skill] || 'Other';
    categories[category].push(skill);
  });
  
  return categories;
};

module.exports = {
  extractSkills,
  calculateCompatibility,
  generateSuggestions,
  categorizeSkills,
  TECH_SKILLS
};
