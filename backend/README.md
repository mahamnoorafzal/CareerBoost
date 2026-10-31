# CareerBoost Backend

Backend API for the CareerBoost resume analysis platform built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Resume file upload and parsing (PDF/DOCX)
- Job description management
- Resume-JD skill matching analysis
- Skill compatibility scoring
- Analysis history tracking

## Project Structure

```
backend/
├── src/
│   ├── models/           # MongoDB schemas
│   ├── controllers/      # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── utils/           # Helper utilities
├── uploads/             # Uploaded resume files
├── server.js            # Main server file
├── package.json         # Dependencies
└── .env.example         # Environment variables template
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Steps

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from template:
```bash
cp .env.example .env
```

3. Configure MongoDB connection in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/careerboost
```

4. Set JWT secret:
```
JWT_SECRET=your_secure_secret_key_here
```

## Running the Server

### Development (with hot reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Resume Management
- `POST /api/resume/upload` - Upload resume (multipart/form-data)
- `GET /api/resume/list` - Get user's resumes
- `GET /api/resume/:id` - Get specific resume
- `DELETE /api/resume/:id` - Delete resume
- `POST /api/resume/job-description` - Save job description
- `GET /api/resume/job-descriptions` - Get all job descriptions

### Analysis
- `POST /api/analysis/analyze` - Analyze resume vs job description
- `GET /api/analysis/history` - Get analysis history
- `GET /api/analysis/:id` - Get specific analysis
- `POST /api/analysis/quick` - Quick analysis without saving

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `POST /api/user/change-password` - Change password

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## File Upload

- Supported formats: PDF, DOCX
- Max file size: 10MB
- Files stored in `/uploads` directory

## Database Models

### User
- name
- email (unique)
- password (hashed)
- profilePicture
- createdAt, updatedAt

### Resume
- userId
- fileName
- filePath
- fileType (pdf/docx)
- extractedText
- skills (array)
- uploadedAt

### JobDescription
- userId
- jobTitle
- companyName
- description
- requiredSkills (array)
- createdAt, updatedAt

### Analysis
- userId
- resumeId
- jobDescriptionId
- compatibilityScore (0-100)
- matchedSkills (array)
- missingSkills (array)
- suggestions (array)
- createdAt

## Error Handling

All errors return appropriate HTTP status codes:
- 400: Bad Request (validation error)
- 401: Unauthorized (auth required)
- 404: Not Found
- 500: Server error

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS protection
- Input validation
- File type validation
- File size limits

## License

MIT
