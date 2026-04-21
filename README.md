# 🚀 AI Resume Analyzer & Skill Match System

## 📌 Overview

The **AI Resume Analyzer & Skill Match System** is a full-stack web application that evaluates resumes by comparing them with job descriptions. It generates a match score, identifies matching and missing skills, and provides insights to improve candidate profiles.

This project simulates a real-world **Applicant Tracking System (ATS)** used by recruiters.

---

## ✨ Features

* 📄 Upload Resume (PDF/DOC)
* 🧠 AI-Based Resume Parsing
* 📊 Match Score Calculation
* ✅ Matching Skills Identification
* ❌ Missing Skills Detection
* 📈 Visual Result Dashboard
* ⚡ Fast and Interactive UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5, CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB (if used)

### AI / NLP Techniques

* Keyword Extraction
* Text Matching
* Skill Gap Analysis

---

## 🔄 Project Workflow

1. User uploads resume
2. User enters job description
3. Backend processes resume content
4. AI logic compares resume with job description
5. System generates:

   * Match Score
   * Matching Skills
   * Missing Skills
6. Results displayed on dashboard

---

## 📂 Folder Structure

```
AI-Resume-Analyzer/
│
├── frontend/        # React UI
├── backend/         # API & logic
├── screenshots/     # UI images
├── sample_data/     # Sample resume & JD
├── README.md
└── .gitignore
```

---

## 📸 Screenshots

### 🏠 Home Page

![Home](screenshots/home.png)

### 📤 Upload Resume

![Upload](screenshots/upload.png)

### 📊 Result Dashboard

![Result](screenshots/result.png)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/gayathriramakrishnan1/AI-Resume-Analyzer-Skill-Match-System.git
cd AI-Resume-Analyzer-Skill-Match-System
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

### 📌 Analyze Resume

```
POST /analyze
```

### Request:

* Resume file
* Job description

### Response:

```json
{
  "score": 85,
  "matchingSkills": ["JavaScript", "React"],
  "missingSkills": ["Node.js", "MongoDB"]
}
```

---

## 🧠 AI Logic

The system uses simple but effective techniques:

* Extracts keywords from resume and job description
* Compares skills using text matching
* Calculates similarity score
* Identifies missing skills (skill gap analysis)

---

## 🚀 Future Enhancements

* 🔍 Advanced ATS Scoring Algorithm
* 🤖 Machine Learning Integration
* 📧 Resume Improvement Suggestions
* 🌐 Live Deployment
* 📊 Detailed Analytics Dashboard

---

## 🌐 Live Demo

*(Add after deployment)*
Frontend: https://your-frontend-link
Backend: https://your-backend-link

---

## 👩‍💻 Author

**Gayathri Ramakrishnan**
Final Year CSE Student

---

## ⭐ Support

If you like this project, give it a ⭐ and share it!

---
