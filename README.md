# internship-tracker
A full-stack web application that helps students track internships, applications, interview schedules, and learning progress.
🚀 Setup Steps
Prerequisites
Node.js (v18 or higher)

MongoDB (local or Atlas Cloud)

![Login Page](Login_page.jpg)

npm or yarn

Step 1: Clone the Repository
bash
git clone https://github.com/vanshsharma85/internship-tracker.git
cd internship-tracker
Step 2: Install Frontend Dependencies
bash
npm install
Step 3: Install Backend Dependencies
bash
cd server
npm install
Step 4: Start MongoDB
Option A: Local MongoDB

bash
# Windows (PowerShell - Admin mode):
net start MongoDB

# Or start manually:
cd "C:\Program Files\MongoDB\Server\5.0\bin"
mongod --dbpath C:\mongo-data
Option B: MongoDB Atlas (Cloud - Recommended)

Go to MongoDB Atlas

Create a free account

Create a free M0 cluster

Get connection string

Update server/index.js:

javascript
mongoose.connect('mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/internship-tracker?retryWrites=true&w=majority')
Step 5: Start Backend Server
bash
cd server
node index.js
Expected output:

text
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
Step 6: Start Frontend
bash
cd ..
npm run dev
Expected output:

text
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:3000/
Step 7: Open in Browser
text
http://localhost:3000
Step 8: Login
text
Email: student@example.com
Password: password123
✨ Features
📊 Dashboard
Feature	Description
Total Applications	Count of all internships added
Applications in Progress	Filtered count (Applied + Screening + Interview)
Interviews Scheduled	Count of interview-stage applications
Offers Received	Count of successful offers
Rejected Applications	Count of rejected applications
Interactive Charts	Bar Chart + Pie Chart with status distribution
📋 Internship Management
Create Internship
Form with all required fields

Auto-generate applied date

Status dropdown with 5 options

Edit Internship
Click "Edit" button on any internship

Pre-fill form with existing data

Update and save changes

Delete Internship
Click "Delete" button

Confirmation dialog before deletion

Instant removal from list

Fields
✅ Company Name
✅ Job Title
✅ Location
✅ Applied Date (date picker)
✅ Status (Applied, Screening, Interview, Offer, Rejected)
✅ Notes (optional text area)

🔍 API Integration
DummyJSON API
Fetch company/product data

GET request to /products?limit=10

Display company name, job title, salary

Add to tracker with POST request

JSONPlaceholder API
Fetch placeholder job data

GET request to /posts?limit=10

Display job title, company, location

Add to tracker with POST request

API Features Demonstrated
✅ GET Requests (fetchCompanies, fetchJobs)
✅ POST Requests (addJobToTracker)
✅ Error Handling (try-catch with error messages)
✅ Loading States ("Loading..." indicators)

🔐 Authentication
✅ Login Page with demo credentials
✅ Protected Routes (redirect to login if not authenticated)
✅ Mock Authentication (client-side validation)
✅ User session stored in localStorage

🔎 Search & Filter
Search
Instant search by company name

Search by job title

Search by location

Real-time filtering

Filter by Status
Dropdown with all 5 status options

Filter applications by current stage

Filter by Company
Auto-populate company list

Filter applications by company name

👤 Author
Vansh Sharma
📍 Ghāziābād, Uttar Pradesh, India
📧 vanshumeshsharma.05@gmail.com


bash
# 1. Start Backend (MongoDB must be running)
cd server
node index.js

# 2. Start Frontend (in new PowerShell)
cd ..
npm run dev

# 3. Open Browser
http://localhost:3000

# 4. Login
Email: student@example.com
Password: password123
