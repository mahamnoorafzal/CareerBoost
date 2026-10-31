# CareerBoost - Resume Analysis Platform

A full-stack MERN application that analyzes resumes and detects missing skills compared to job descriptions.

## 🚀 Features

✅ **User Authentication**
- Secure registration and login with JWT
- Password hashing with bcryptjs
- Protected routes and profile management

✅ **Resume Management**
- Upload resumes in PDF/DOCX format
- Automatic text extraction from documents
- Skill detection from resume content

✅ **Job Description Analysis**
- Input job descriptions from any source
- Automatic skill extraction
- Multiple job descriptions per user

✅ **Smart Analysis**
- Keyword-based skill matching (no complex ML)
- Compatibility score calculation (0-100%)
- Missing skills identification
- Personalized recommendations

✅ **Modern UI**
- Responsive design with Tailwind CSS
- Professional color theme (Dusky Red #8B1E3F)
- Mobile-friendly interface
- Smooth animations and transitions

## 📋 Tech Stack

### Backend
- **Node.js + Express.js** - REST API server
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **pdfparse + mammoth** - Document parsing

### Frontend
- **React.js 18** - UI library
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📁 Project Structure

```
CareerBoost/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Route logic
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth & validation
│   │   └── utils/           # Helpers (parsing, skills, tokens)
│   ├── uploads/             # Uploaded resume files
│   ├── server.js            # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Auth context
│   │   ├── utils/           # API client
│   │   ├── styles/          # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js v14+** (https://nodejs.org/)
- **MongoDB** - Local or MongoDB Atlas Cloud (https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn**

### Step 1: Clone/Setup Project

```bash
# Navigate to project directory
cd CareerBoost
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: Generate a secure random string
# - PORT: (optional) Default is 5000

# Start development server
npm run dev

# Or for production:
npm start
```

Backend will run on `http://localhost:5000`

### Step 3: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env if needed (API_URL defaults to http://localhost:5000/api)

# Start development server
npm start
```

Frontend will open at `http://localhost:3000`

## 📱 Usage

### 1. Register/Login
- Go to home page
- Click "Get Started" or "Sign In"
- Create account or login with credentials

### 2. Upload Resume
- Go to Dashboard
- Click "Upload Resume"
- Select PDF or DOCX file (max 10MB)
- System extracts text and detects skills

### 3. Add Job Description
- Click "Add Job Description"
- Enter job title, company, and description
- System extracts required skills

### 4. Analyze
- Go to Dashboard
- Select a resume and job description
- Click "Analyze" to get:
  - Compatibility score (0-100%)
  - Matched skills
  - Missing skills
  - Personalized recommendations

### 5. View Results
- See detailed analysis report
- Print or export results
- Track analysis history

## 🔑 Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <your_jwt_token>
```

Token is automatically included by the frontend in all API requests.

## 📊 API Endpoints

### Auth
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
```

### Resume
```
POST   /api/resume/upload      - Upload resume file
GET    /api/resume/list        - Get all user's resumes
GET    /api/resume/:id         - Get specific resume
DELETE /api/resume/:id         - Delete resume
```

### Job Description
```
POST   /api/resume/job-description       - Save job description
GET    /api/resume/job-descriptions      - Get all job descriptions
```

### Analysis
```
POST   /api/analysis/analyze    - Analyze resume vs JD
GET    /api/analysis/history    - Get analysis history
GET    /api/analysis/:id        - Get specific analysis
POST   /api/analysis/quick      - Quick analysis (no save)
```

### User
```
GET    /api/user/profile        - Get user profile
PUT    /api/user/profile        - Update profile
POST   /api/user/change-password - Change password
```

## 🎨 Design & Colors

The application uses a professional color scheme:

- **Primary Red**: `#8B1E3F` - Main accent color
- **Dark Red**: `#6D0F2B` - Darker variant
- **White**: `#FFFFFF` - Backgrounds & text
- **Light Gray**: `#F5F5F5` - Secondary background

## 📝 Sample Testing Data

### Test User
```
Email: test@careerboost.com
Password: Test123456
```

### Sample Resume (create .txt version)
```
John Doe
Senior React Developer

Skills: JavaScript, React, Node.js, MongoDB, 
Tailwind CSS, Express.js, Git, Docker

Experience:
- 5 years as React Developer
- 3 years with Node.js
- Full-stack development
```

### Sample Job Description
```
Position: Senior Full Stack Developer at Tech Corp

Required Skills: JavaScript, React, Vue.js, Node.js, 
MongoDB, PostgreSQL, AWS, Docker, Git

Responsibilities:
- Build responsive web applications
- Develop RESTful APIs
- Manage databases
- Deploy applications to cloud
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ CORS protection
- ✅ Input validation on both frontend and backend
- ✅ File type and size validation
- ✅ Protected routes middleware
- ✅ Secure password reset capability

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
# Set environment variables on deployment platform
# Push code and deploy

# Or use Docker:
docker build -t careerboost-backend .
docker run -p 5000:5000 careerboost-backend
```

### Frontend (Vercel/Netlify)
```bash
# Build production version
npm run build

# Deploy the `build` folder to Vercel or Netlify
```

## 📚 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profilePicture: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Resume
```javascript
{
  userId: ObjectId,
  fileName: String,
  filePath: String,
  fileType: String (pdf/docx),
  extractedText: String,
  skills: [String],
  uploadedAt: Date,
  fileSize: Number
}
```

### JobDescription
```javascript
{
  userId: ObjectId,
  jobTitle: String,
  companyName: String,
  description: String,
  requiredSkills: [String],
  createdAt: Date
}
```

### Analysis
```javascript
{
  userId: ObjectId,
  resumeId: ObjectId,
  jobDescriptionId: ObjectId,
  compatibilityScore: Number (0-100),
  matchedSkills: [String],
  missingSkills: [String],
  suggestions: [String],
  totalRequiredSkills: Number,
  totalMatchedSkills: Number,
  createdAt: Date
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally OR connection string is correct
- Check MONGODB_URI in .env file
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
```bash
# Backend (Windows):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (different port):
PORT=3001 npm start
```

### JWT Token Expiration
- Tokens expire after 30 days (configurable in .env)
- User will be automatically logged out
- Login again to get new token

### File Upload Issues
- Maximum file size: 10MB
- Allowed formats: PDF, DOCX only
- Check uploads folder permissions

## 📖 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [JWT](https://jwt.io/)

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💬 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review code comments

## 🎉 Success Checklist

- [ ] Backend server running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] Can register and login
- [ ] Can upload resume (test with PDF or DOCX)
- [ ] Can add job description
- [ ] Can view analysis results
- [ ] Can view profile and settings

---

Built with ❤️ using MERN Stack
