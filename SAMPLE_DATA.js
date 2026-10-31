// Sample Test Data
// Use this for testing without real resume uploads

const sampleResume = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1-555-0100",
  summary: "Senior Full Stack Developer with 5+ years of experience in building scalable web applications using modern technologies.",
  
  skills: [
    "JavaScript", "React", "Vue.js", "Angular",
    "Node.js", "Express.js", "Python", "Django",
    "MongoDB", "MySQL", "PostgreSQL", "Redis",
    "Docker", "Kubernetes", "AWS", "Git",
    "HTML", "CSS", "Tailwind CSS", "Bootstrap",
    "REST APIs", "GraphQL", "Microservices"
  ],
  
  experience: [
    {
      company: "Tech Corp",
      position: "Senior React Developer",
      duration: "2021 - Present",
      description: "Lead frontend team, develop React applications, manage code reviews"
    },
    {
      company: "StartUp Inc",
      position: "Full Stack Developer",
      duration: "2019 - 2021",
      description: "Built full-stack applications using MERN stack, managed databases"
    },
    {
      company: "Digital Solutions",
      position: "Junior Developer",
      duration: "2018 - 2019",
      description: "Developed web applications, supported senior developers"
    }
  ],
  
  education: [
    {
      school: "University of Technology",
      degree: "Bachelor of Computer Science",
      year: "2018"
    }
  ]
};

const sampleJobDescription = {
  jobTitle: "Senior Full Stack Developer",
  company: "Google",
  
  description: `
    We are looking for an experienced Senior Full Stack Developer to join our team.
    
    About the Role:
    - Design and develop scalable web applications
    - Lead technical implementation of new features
    - Mentor junior developers
    - Collaborate with product and design teams
    
    Required Skills:
    - JavaScript/TypeScript (5+ years)
    - React or Vue.js (3+ years)
    - Node.js/Express.js (3+ years)
    - MongoDB or PostgreSQL (3+ years)
    - AWS or GCP experience
    - Docker and Kubernetes
    - REST APIs and GraphQL
    - Git version control
    
    Nice to Have:
    - Machine Learning experience
    - Mobile development (React Native)
    - DevOps experience
    - Open source contributions
  `,
  
  requiredSkills: [
    "JavaScript", "TypeScript", "React", "Node.js",
    "Express.js", "MongoDB", "PostgreSQL", "AWS",
    "Docker", "Kubernetes", "REST APIs", "GraphQL",
    "Git"
  ]
};

const sampleAnalysisResult = {
  compatibilityScore: 82,
  
  matchedSkills: [
    "JavaScript", "React", "Node.js", "Express.js",
    "MongoDB", "Docker", "AWS", "REST APIs", "Git"
  ],
  
  missingSkills: [
    "TypeScript", "GraphQL", "Kubernetes", "PostgreSQL"
  ],
  
  suggestions: [
    "Learn TypeScript to improve type safety in your projects",
    "Take a GraphQL course to expand API knowledge",
    "Get Kubernetes certification for container orchestration",
    "PostgreSQL experience would complement your MongoDB skills"
  ]
};

module.exports = {
  sampleResume,
  sampleJobDescription,
  sampleAnalysisResult
};
