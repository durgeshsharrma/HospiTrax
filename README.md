# 🏥 Hospitrax - Hospital Management System

Hospitrax is a full-stack Hospital Management Web App built using the MERN stack. It supports role-based login for Admins, Doctors, and Patients, along with appointment booking, patient management, and secure authentication.

## 🚀 Features

- 👤 Role-based access (Admin, Doctor, Patient)
- 📝 Appointment booking & cancellation
- 🏥 Add/View Doctors and Patients (Admin)
- 📅 Doctor schedule management
- 🔐 JWT Authentication with protected routes
- 🌐 Responsive UI (Bootstrap)

## 💻 Tech Stack

### Frontend:
- React.js
- Bootstrap Icons
- Axios
- React Router

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT & bcrypt
- Joi validation

## 🔐 Roles & Permissions

| Role     | Permissions                                       |
|----------|---------------------------------------------------|
| Admin    | Add/Delete doctors, manage users, view all data   |
| Doctor   | View patients, manage schedule, see appointments  |
| Patient  | Book/cancel appointments, update profile          |


## 🧪 Installation & Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/hospitrax.git
cd hospitrax

# Backend
cd backend
npm install
node app.js

# Frontend
cd ../frontend
npm install
npm run dev 
