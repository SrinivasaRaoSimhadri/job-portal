
# Job Portal - 'Find Your Next Dream Job' 🚀

## Overview

Welcome to the **Job Portal**! This platform connects job seekers with employers, providing an easy-to-use space for creating personalized portfolios, applying for jobs, and managing applications. It also allows employers to post job listings and review applicants in detail. With features like real-time status tracking, social connections, and a customized feed, **Find Your Next Dream Job** is designed to streamline the hiring process.

---

## 🌟 Project Features

- **User Portfolio Creation**:  
  Users can create personalized portfolios to showcase their **experience**, **certifications**, **address**, and **profile** details. This helps job seekers present their credentials to potential employers in a structured and professional way.

- **Job Applications with Real-Time Status Tracking**:  
  Job seekers can apply to open positions and track their **application status** (Accepted or Rejected). This feature ensures that users are kept informed throughout the hiring process.

- **Job Posting & Application Management**:  
  Employers can post job openings and manage applicants. They can assess applicant portfolios and choose to accept or reject applications, all from a simple, easy-to-use interface.

- **Social Connections – Follow & Unfollow**:  
  Users can **follow** or **unfollow** other users. This feature helps foster a network within the platform, ensuring users stay connected and informed about relevant job postings.

- **Customized Feed Based on Follows**:  
  Users receive a personalized feed showcasing job postings and updates from users they follow, ensuring that only the most relevant job opportunities are displayed.

- **Enhanced Employer View for Job Postings**:  
  Employers can view a detailed portfolio of each applicant, including all key details, which helps them make more informed decisions when reviewing candidates.

---

## 🛠 Tech Stack & Implementation

- **MERN Stack**:  
  The project is built using the **MongoDB**, **Express**, **React**, and **Node.js** stack, offering a robust full-stack architecture.

- **JWT Authentication**:  
  To ensure security, **JWT (JSON Web Token)** is used for secure login and user session management across the platform.

- **React Redux**:  
  Efficient state management is implemented using **React Redux**, making the UI responsive and enabling real-time updates.

- **Mongoose**:  
  The database schema and models are defined using **Mongoose**, providing an easy-to-use and efficient way to work with MongoDB.

- **API & Schema-Level Validations**:  
  To ensure data integrity, both **API** and **schema-level validations** are implemented, safeguarding the application from data inconsistencies.

---

## 🚀 Features Walkthrough

1. **User Portfolio Creation**:
   - Users can create and update their portfolios, showcasing their professional experience and certifications.
   
2. **Job Applications**:
   - Apply for jobs and track the application status (Accepted or Rejected).

3. **Employer View**:
   - Employers can post jobs, view applicants’ portfolios, and manage applications.

4. **Follow & Unfollow**:
   - Stay updated on job postings and other activities by following users within the platform.

5. **Customized Feed**:
   - Get a personalized feed based on the users you follow to ensure that job opportunities are tailored to your interests.

---

## ⚙️ Installation & Setup

To set up the project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/SrinivasaRaoSimhadri/job-portal.git
```

### 2. Install Dependencies

Navigate to both the backend and frontend directories and install the dependencies.

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the **backend** directory and define the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the Project

To run the project in development mode:

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm start
```

Visit `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

---

🚀 **Find Your Next Dream Job** and connect with opportunities today!  

