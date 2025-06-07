const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2 // Import Cloudinary configuration
const doctorModel = require('../models/doctor.model'); // Import the doctor model
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const appointmentModel = require('../models/appointment.model');
const userModel = require('../models/user.model'); // Import the user model



// Api for Adding Doctor

module.exports.addDoctor = async (req, res) => {
    try {
      
  
      const {
        name,
        email,
        password,
        speciality,
        experience,
        degree,
        about,
        fees,
        address,
      } = req.body;
  
      const imageFile = req.file;
  
      // Check for missing fields
      if (
        !name ||
        !email ||
        !password ||
        !speciality ||
        !experience ||
        !degree ||
        !about ||
        !fees ||
        !address ||
        !imageFile
      ) {
       
        return res.status(400).json({ message: "All fields are required" });
        }
        
        const isAlreadyExist = await doctorModel.find({email})

        if(isAlreadyExist.length > 0){
            return res.status(400).json({ message: "Doctor with this email already exists" });
        }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
       
        return res.status(400).json({ message: "Invalid email format" });
      }
  
      // Password validation
    //   const passwordRegex =
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    //   if (!passwordRegex.test(password)) {
    //     console.log("❌ Validation failed: weak password");
    //     return res.status(400).json({
    //       message:
    //         "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    //     });
    //   }
  
      // ✅ Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
   
  
      // ✅ Get Cloudinary image URL from multer
      const imageUrl = imageFile.path;
    
  
      const doctor = {
        name,
        email,
        password: hashedPassword,
        speciality,
        experience,
        degree,
        about,
        fees,
        address,
        image: imageUrl,
        date: Date.now(),
      };
  
      const newDoctor = new doctorModel(doctor);
      await newDoctor.save();
   
      res.status(201).json({ message: "Doctor added successfully" });
    } catch (error) {
    
      res.status(500).json({ message: "Internal server error" });
    }
  };
  



// Api for Login Admin

module.exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the admin by email
        if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){


            const admintoken = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: '1h' // Token expiration time
            });

          res.cookie('admintoken' , admintoken , {
                httpOnly : true , // Prevents client-side JavaScript from accessing the token
                secure : process.env.NODE_ENV === 'production' , // Use secure cookies in production
                maxAge : 3600000 , // 1 hour in milliseconds  
            });

            console.log('Admin logged in successfully');
            return res.status(200).json({ message: 'Login successful', adminId: 'admin', token: admintoken });
          
        }

        else{
            return res.status(404).json({ message: 'Admin not found' });
        }
        

        //after login generate token

       
       

       
      
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// get all the doctors for admin

module.exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password'); // Exclude password field
        if (doctors.length === 0) {
            return res.status(404).json({ message: 'No doctors found' });
        }

        res.status(200).json({ success: true, doctors });
    }
    catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// GET all appointments for admin
module.exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find()
      .populate('docId')   // Populate doctor details
      .populate('userId'); // Populate user (patient) details

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
};




module.exports.getDashboardData = async (req, res) => {
  try {
    const users = await userModel.countDocuments();
    const doctors = await doctorModel.countDocuments();
    const appointments = await appointmentModel.countDocuments();

    res.status(200).json({ users, doctors, appointments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error });
  }
}