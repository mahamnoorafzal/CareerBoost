// API Routes Guide
// Complete reference of all CareerBoost API endpoints

/**
 * BASE URL: http://localhost:5000/api
 * 
 * All protected routes require JWT token in header:
 * Authorization: Bearer <token>
 */

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

/**
 * Register New User
 * POST /auth/register
 * No auth required
 * 
 * Request Body:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "Test1234",
 *   "confirmPassword": "Test1234"
 * }
 * 
 * Response:
 * {
 *   "message": "User registered successfully",
 *   "token": "eyJhbGciOiJIUzI1NiIs...",
 *   "user": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "createdAt": "2024-01-01T00:00:00Z"
 *   }
 * }
 */

/**
 * Login User
 * POST /auth/login
 * No auth required
 * 
 * Request Body:
 * {
 *   "email": "john@example.com",
 *   "password": "Test1234"
 * }
 * 
 * Response:
 * {
 *   "message": "Login successful",
 *   "token": "eyJhbGciOiJIUzI1NiIs...",
 *   "user": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "John Doe",
 *     "email": "john@example.com"
 *   }
 * }
 */

// ==========================================
// 2. RESUME ROUTES
// ==========================================

/**
 * Upload Resume
 * POST /resume/upload
 * Auth required: YES
 * Content-Type: multipart/form-data
 * 
 * Form Data:
 * - resume: <file> (PDF or DOCX, max 10MB)
 * 
 * Response:
 * {
 *   "message": "Resume uploaded successfully",
 *   "resume": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "fileName": "john_resume.pdf",
 *     "uploadedAt": "2024-01-01T00:00:00Z",
 *     "skills": ["JavaScript", "React", "Node.js", ...]
 *   }
 * }
 */

/**
 * Get All User Resumes
 * GET /resume/list
 * Auth required: YES
 * 
 * Response:
 * {
 *   "count": 2,
 *   "resumes": [
 *     {
 *       "_id": "507f1f77bcf86cd799439011",
 *       "fileName": "john_resume.pdf",
 *       "fileType": "pdf",
 *       "skills": ["JavaScript", "React"],
 *       "uploadedAt": "2024-01-01T00:00:00Z"
 *     }
 *   ]
 * }
 */

/**
 * Get Specific Resume
 * GET /resume/:id
 * Auth required: YES
 * 
 * Response:
 * {
 *   "resume": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "fileName": "john_resume.pdf",
 *     "extractedText": "John Doe...",
 *     "skills": ["JavaScript", "React", ...],
 *     "uploadedAt": "2024-01-01T00:00:00Z"
 *   }
 * }
 */

/**
 * Delete Resume
 * DELETE /resume/:id
 * Auth required: YES
 * 
 * Response:
 * {
 *   "message": "Resume deleted successfully"
 * }
 */

/**
 * Save Job Description
 * POST /resume/job-description
 * Auth required: YES
 * 
 * Request Body:
 * {
 *   "jobTitle": "Senior React Developer",
 *   "companyName": "Google",
 *   "description": "Required skills: JavaScript, React, Node.js..."
 * }
 * 
 * Response:
 * {
 *   "message": "Job description saved successfully",
 *   "jobDescription": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "jobTitle": "Senior React Developer",
 *     "companyName": "Google",
 *     "requiredSkills": ["JavaScript", "React", "Node.js"],
 *     "createdAt": "2024-01-01T00:00:00Z"
 *   }
 * }
 */

/**
 * Get All Job Descriptions
 * GET /resume/job-descriptions
 * Auth required: YES
 * 
 * Response:
 * {
 *   "count": 1,
 *   "jobDescriptions": [
 *     {
 *       "_id": "507f1f77bcf86cd799439011",
 *       "jobTitle": "Senior React Developer",
 *       "companyName": "Google",
 *       "requiredSkills": ["JavaScript", "React"]
 *     }
 *   ]
 * }
 */

// ==========================================
// 3. ANALYSIS ROUTES
// ==========================================

/**
 * Analyze Resume vs Job Description
 * POST /analysis/analyze
 * Auth required: YES
 * 
 * Request Body:
 * {
 *   "resumeId": "507f1f77bcf86cd799439011",
 *   "jobDescriptionId": "607f1f77bcf86cd799439012"
 * }
 * 
 * Response:
 * {
 *   "message": "Analysis completed successfully",
 *   "analysis": {
 *     "_id": "707f1f77bcf86cd799439013",
 *     "compatibilityScore": 75,
 *     "matchedSkills": ["JavaScript", "React", "Node.js"],
 *     "missingSkills": ["TypeScript", "GraphQL"],
 *     "suggestions": [
 *       "📚 Learn TypeScript",
 *       "💡 Consider GraphQL course"
 *     ],
 *     "totalRequiredSkills": 10,
 *     "totalMatchedSkills": 7,
 *     "jobTitle": "Senior React Developer",
 *     "companyName": "Google",
 *     "createdAt": "2024-01-01T00:00:00Z"
 *   }
 * }
 */

/**
 * Get Analysis History
 * GET /analysis/history
 * Auth required: YES
 * 
 * Response:
 * {
 *   "count": 5,
 *   "analyses": [
 *     {
 *       "_id": "707f1f77bcf86cd799439013",
 *       "compatibilityScore": 75,
 *       "resumeId": {...},
 *       "jobDescriptionId": {...},
 *       "createdAt": "2024-01-01T00:00:00Z"
 *     }
 *   ]
 * }
 */

/**
 * Get Specific Analysis
 * GET /analysis/:id
 * Auth required: YES
 * 
 * Response:
 * {
 *   "analysis": {
 *     "_id": "707f1f77bcf86cd799439013",
 *     "compatibilityScore": 75,
 *     "matchedSkills": ["JavaScript", "React"],
 *     "missingSkills": ["TypeScript"],
 *     "suggestions": [...],
 *     "totalRequiredSkills": 10,
 *     "totalMatchedSkills": 7,
 *     "resumeId": {...},
 *     "jobDescriptionId": {...}
 *   }
 * }
 */

/**
 * Quick Analysis (Without Saving)
 * POST /analysis/quick
 * Auth required: YES
 * 
 * Request Body:
 * {
 *   "resumeSkills": ["JavaScript", "React", "Node.js"],
 *   "requiredSkills": ["JavaScript", "React", "TypeScript"]
 * }
 * 
 * Response:
 * {
 *   "compatibilityScore": 66,
 *   "matchedSkills": ["JavaScript", "React"],
 *   "missingSkills": ["TypeScript"],
 *   "suggestions": [...],
 *   "totalRequiredSkills": 3,
 *   "totalMatchedSkills": 2
 * }
 */

// ==========================================
// 4. USER ROUTES
// ==========================================

/**
 * Get User Profile
 * GET /user/profile
 * Auth required: YES
 * 
 * Response:
 * {
 *   "user": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "profilePicture": null,
 *     "createdAt": "2024-01-01T00:00:00Z"
 *   }
 * }
 */

/**
 * Update User Profile
 * PUT /user/profile
 * Auth required: YES
 * 
 * Request Body:
 * {
 *   "name": "John Smith",
 *   "email": "john.smith@example.com"
 * }
 * 
 * Response:
 * {
 *   "message": "Profile updated successfully",
 *   "user": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "John Smith",
 *     "email": "john.smith@example.com",
 *     "updatedAt": "2024-01-02T00:00:00Z"
 *   }
 * }
 */

/**
 * Change Password
 * POST /user/change-password
 * Auth required: YES
 * 
 * Request Body:
 * {
 *   "currentPassword": "OldPass123",
 *   "newPassword": "NewPass456",
 *   "confirmPassword": "NewPass456"
 * }
 * 
 * Response:
 * {
 *   "message": "Password changed successfully"
 * }
 */

// ==========================================
// 5. UTILITY ROUTES
// ==========================================

/**
 * Health Check
 * GET /health
 * Auth required: NO
 * 
 * Response:
 * {
 *   "status": "Server is running ✅"
 * }
 */

// ==========================================
// ERROR RESPONSES
// ==========================================

/**
 * 400 Bad Request
 * {
 *   "message": "Validation error message"
 * }
 */

/**
 * 401 Unauthorized
 * {
 *   "message": "No token provided"
 *   // or "Invalid token"
 *   // or "Token has expired"
 * }
 */

/**
 * 404 Not Found
 * {
 *   "message": "Resource not found"
 * }
 */

/**
 * 500 Internal Server Error
 * {
 *   "message": "Error message"
 * }
 */

// ==========================================
// JAVASCRIPT EXAMPLES
// ==========================================

// Example: Register with fetch
const register = async () => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Test1234',
      confirmPassword: 'Test1234',
    }),
  });
  const data = await response.json();
  console.log(data);
};

// Example: Upload Resume with FormData
const uploadResume = async (token, file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch('http://localhost:5000/api/resume/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  console.log(data);
};

// Example: Analyze Resume with axios (frontend)
import api from './utils/api';

const analyzeResume = async (resumeId, jobDescriptionId) => {
  const response = await api.post('/analysis/analyze', {
    resumeId,
    jobDescriptionId,
  });
  console.log(response.data);
};

// ==========================================
// POSTMAN COLLECTION
// ==========================================

/*
Import this JSON into Postman:

{
  "info": {
    "name": "CareerBoost API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/register"
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login"
          }
        }
      ]
    },
    {
      "name": "Resume",
      "item": [
        {
          "name": "Upload",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/resume/upload"
          }
        },
        {
          "name": "List",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/resume/list"
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api"
    }
  ]
}
*/
