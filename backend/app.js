const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const { connectDB } = require('./config/mongodb');
const { connectCloudinary } = require('./config/cloudinary');
const adminRoutes = require('./routes/admin.Route');
const cookieParser = require('cookie-parser')
const doctorRoutes = require('./routes/doctor.route');
const userRoutes = require('./routes/user.route');
const path = require('path');
// Initialize Cloudinary

// Connect to MongoDB
connectDB();









// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: ['https://hospitrax.onrender.com', 'https://hospitrax-adminn.onrender.com'],  // no trailing slash
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // common headers
   
};

app.use(cors(corsOptions));
// Static files
app.use(express.static(path.join(__dirname, 'client', 'build')));



app.use(cookieParser()); // Middleware to parse cookies



// Routes
app.use('/api/admin', adminRoutes); 
app.use('/api/doctor', doctorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', require('./routes/payment.route'));


// All other routes should serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});





//Server Creation
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
