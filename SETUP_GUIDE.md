# 🚀 CAREERBOOST - COMPLETE SETUP GUIDE

## Quick Start (5 Minutes)

This guide will help you get CareerBoost running locally on your machine.

---

## ✅ Prerequisites

Make sure you have these installed:

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **MongoDB**
   - **Option A (Local)**: https://www.mongodb.com/try/download/community
   - **Option B (Cloud)**: https://www.mongodb.com/cloud/atlas (recommended)
   - Verify: MongoDB running and accessible

3. **Git** (optional)
   - Download: https://git-scm.com/

---

## 📦 Installation Steps

### 1️⃣ Open Terminal/Command Prompt

Navigate to the CareerBoost folder:
```bash
cd path/to/CareerBoost
```

---

### 2️⃣ Setup Backend

```bash
# Go to backend folder
cd backend

# Install dependencies (this takes 2-3 minutes)
npm install

# Create .env file
cp .env.example .env
# OR on Windows:
# type .env.example > .env
```

#### Configure Backend (.env file)

Open `backend/.env` and update:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/careerboost

# JWT Secret (change to random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

**For MongoDB Atlas Cloud:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerboost
```

---

### 3️⃣ Start Backend Server

```bash
# Still in backend folder

# Development mode with hot reload
npm run dev

# Or production mode
npm start
```

**Expected output:**
```
✅ MongoDB connected successfully
🚀 CareerBoost Backend running on http://localhost:5000
```

Keep this terminal open!

---

### 4️⃣ Setup Frontend (Open New Terminal)

```bash
# Open new terminal window
# Navigate to project root
cd CareerBoost

# Go to frontend folder
cd frontend

# Install dependencies (2-3 minutes)
npm install

# Create .env file
cp .env.example .env
# OR on Windows:
# type .env.example > .env
```

#### Configure Frontend (.env file)

Open `frontend/.env` (usually pre-configured):
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

### 5️⃣ Start Frontend Server

```bash
# Still in frontend folder

npm start
```

**Expected output:**
```
Compiled successfully!

You can now view careerboost-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

Frontend will automatically open in browser!

---

## 🎉 You're Ready!

Both servers are running:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

---

## 👤 Test the Application

### 1. Register a New Account

1. Visit http://localhost:3000
2. Click "Get Started"
3. Fill in:
   - Name: `John Doe`
   - Email: `john@test.com`
   - Password: `Test1234` (min 6 chars)
   - Confirm: `Test1234`
4. Click "Create Account"

### 2. Upload Resume

1. Click "Upload Resume"
2. Create a test PDF/DOCX with skills like:
   ```
   John Doe - Senior Developer
   
   Skills: JavaScript, React, Node.js, MongoDB, 
   Docker, AWS, Git
   ```
3. Upload the file
4. See extracted skills in dashboard

### 3. Add Job Description

1. Click "Add Job Description"
2. Fill in:
   - **Job Title**: Senior React Developer
   - **Company**: Tech Corp
   - **Description**: 
     ```
     Required: JavaScript, React, Node.js, MongoDB,
     Docker, AWS, Git, TypeScript, GraphQL
     
     Nice to have: Kubernetes, PostgreSQL
     ```
3. Click "Save Job Description"

### 4. Analyze Resume

1. Go back to Dashboard
2. Select your resume and job description
3. Click "Analyze"
4. See:
   - Compatibility Score: ~77%
   - Matched Skills: JavaScript, React, Node.js, etc.
   - Missing Skills: TypeScript, GraphQL, etc.
   - Recommendations for learning

---

## 🔧 Common Issues & Solutions

### Issue: MongoDB Connection Error
```
❌ MongoDB connection error
```
**Solution:**
- Check if MongoDB is running (local) or Atlas is accessible
- Verify connection string in `.env`
- Make sure credentials are correct

---

### Issue: Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution (Windows):**
```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port
PORT=5001 npm start
```

**Solution (Mac/Linux):**
```bash
# Kill process on port
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm start
```

---

### Issue: CORS Error

```
Access to XMLHttpRequest blocked by CORS
```

**Solution:**
- Ensure `CORS_ORIGIN=http://localhost:3000` in backend `.env`
- Restart backend server

---

### Issue: Cannot Upload Resume

```
File size must be less than 10MB
or
Only PDF and DOCX files are allowed
```

**Solution:**
- Use valid PDF or DOCX file (no XLSX, TXT, etc.)
- File must be less than 10MB
- Test with a real resume

---

## 📚 Project Structure Quick Reference

```
CareerBoost/
├── backend/
│   ├── src/models/       → Database schemas
│   ├── src/controllers/  → Business logic
│   ├── src/routes/       → API endpoints
│   ├── src/middleware/   → Auth & validation
│   ├── src/utils/        → Helpers
│   ├── .env              → Configuration
│   └── server.js         → Start here
│
├── frontend/
│   ├── src/pages/        → Page components
│   ├── src/components/   → Reusable components
│   ├── src/context/      → Auth state
│   ├── src/utils/        → API client
│   ├── .env              → Configuration
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md             → Project overview
```

---

## 🎨 Understanding the Application Flow

```
1. User Visit Home Page
   ↓
2. User Registers/Logs In
   ↓ (JWT token stored)
3. User Uploads Resume
   ↓ (Extract text & skills)
4. User Adds Job Description
   ↓ (Extract required skills)
5. User Clicks "Analyze"
   ↓
6. Backend Matches Skills
   ↓
7. View Results
   ↓ (Print/Share report)
```

---

## 📱 Mobile Testing

To test on mobile devices on same network:

1. Find your computer IP:
   ```bash
   # Windows
   ipconfig

   # Mac/Linux
   ifconfig
   ```

2. On mobile, visit:
   ```
   http://YOUR_IP:3000
   ```

---

## 🐛 Debug Mode

To see network requests, open browser DevTools:
- Press `F12` or `Ctrl+Shift+I`
- Go to **Network** tab
- Perform actions and see API calls

---

## 📧 API Testing with Postman

1. Download Postman: https://www.postman.com/download/
2. Create new request:
   ```
   POST http://localhost:5000/api/auth/register
   
   Body (JSON):
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "Test1234",
     "confirmPassword": "Test1234"
   }
   ```

---

## ✨ Next Steps

After setup works:

1. **Customize colors** - Edit `frontend/tailwind.config.js`
2. **Add more skills** - Edit `backend/src/utils/skillMatcher.js`
3. **Deploy** - Host on Vercel (frontend) + Railway/Heroku (backend)
4. **Add features** - Email notifications, advanced analytics, etc.

---

## 🚀 Deployment

### Deploy Backend (Railway)

1. Go to https://railway.app
2. Sign in with GitHub
3. Create new project → Deploy from GitHub
4. Select CareerBoost backend folder
5. Add environment variables
6. Deploy!

### Deploy Frontend (Vercel)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Import repository
4. Select frontend folder
5. Set `REACT_APP_API_URL` to your Railway backend URL
6. Deploy!

---

## ❓ Still Having Issues?

1. **Check logs** - Look at terminal output for errors
2. **Clear cache** - Delete `node_modules`, reinstall
3. **Update npm** - Run `npm install -g npm@latest`
4. **Restart services** - Stop and restart both servers
5. **Check ports** - Use `netstat` or `lsof` to verify ports

---

## 📞 Support Resources

- **Express.js**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **MongoDB Docs**: https://www.mongodb.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/

---

## ✅ Success Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB running or Atlas connected
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend server running (http://localhost:5000)
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] Frontend running (http://localhost:3000)
- [ ] Can register and login
- [ ] Can upload resume
- [ ] Can add job description
- [ ] Can view analysis results

---

## 🎉 Congratulations!

You now have a fully functional resume analysis platform running locally!

**Happy coding! 🚀**

---

*Last updated: May 2024*
*CareerBoost - Build Your Career Today*
