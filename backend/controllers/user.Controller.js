const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const cloudinary = require('cloudinary').v2
const upload = require('../middlewares/multer');
const appointmentModel = require('../models/appointment.model');
const doctorModel = require('../models/doctor.model'); // <-- add this line




module.exports.registerUser = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;
        const imageFile = req.file;
        
        // Check for missing fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const isExist = await userModel.find({ email });
       
        if (isExist.length > 0) {
            return res.status(400).json({ message: "User with this email already exists" });
        }


        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            // Default profile picture URL
        })

        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePicture: newUser.image || 'default-profile.png' // Default profile picture
            }
        });


    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

}



module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('ayah aga hu')

        // Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const uToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log('logged')

        res.status(200).json({
            message: "User logged in successfully",
            uToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.image || 'default-profile.png' // Default profile picture
            }
        });
        

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//Api To get user profile data
module.exports.getUserProfile = async (req, res) => {
    try {

        console.log(req.user)

        const { userId } = req.user;
        const userData = await userModel.findById(userId).select('-password')
        // console.log(userData ,' me hu  wo user')


        res.status(200).json({ success: true, userData })

    }
    catch (err) {
        

    }
}





module.exports.updateProfile = async (req, res) => {
    try {
       
        const { userId } = req.params;
       
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
       
        


        if (!name || !phone || !dob || !gender || !address) {
           
            return res.json({ success: false, message: 'Data Missing' });
        }

        let updateData = { name, phone, address, dob, gender };

        if (imageFile) {
            console.log("📤 Upload karne ja rahe hain Cloudinary pe");
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            

            const imageUrl = imageUpload.secure_url;
            updateData.image = imageUrl;
        }
        

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
       
        
        res.json({ success: true, message: 'User Profile Updated Successfully' });
    } catch (err) {
        console.log('err in update', err);
        return res.json({ success: false, message: 'Error in updateProfile' });
    }
};




//   To Book Appointment Make aPI

module.exports.bookAppointment = async (req ,  res) => {

    try{
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');


        if (!docData.availability)
        {
            return res.json({ success: false, message: 'Doctor is Not Available' });
        }

        let slots_booked = docData.slots_booked;
        // checking for slot availability

        if (slots_booked[slotDate])
        {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'slot Not Available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
           
            
        }
        else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }


        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date : Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();

        //save slots data in docData
        
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        
        res.json({success : true , message : 'Appointment Booked'})
        
    }catch(err)
    {
        console.log(err,  'err in bookapoointment')
    }
    
}


module.exports.getUserAppointments = async (req, res) => {
    try {
        const id = req.user.userId;
        const appointments = await appointmentModel.find({ userId: id })
            .populate('docId', 'name image speciality address')  // now mongoose knows Doctor schema
            .sort({ date: -1 });
        console.log(appointments)

        res.status(200).json({
            success: true,
            appointments,
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments',
        });
    }
  };





// Api to cancel appointment

module.exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await appointmentModel.findById(id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Check if already cancelled
        if (appointment.cancelled) {
            return res.status(400).json({ success: false, message: "Appointment already cancelled" });
        }

        // Mark appointment as cancelled
        appointment.cancelled = true;
        await appointment.save();

        // Free the doctor's slot
        const doctor = await doctorModel.findById(appointment.docId);
        if (doctor) {
            const slotDate = appointment.slotDate;
            const slotTime = appointment.slotTime;

            // Ensure doctor.slots_booked[slotDate] is an array
            if (doctor.slots_booked[slotDate]) {
                doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter(time => time !== slotTime);

                // Optional: Remove empty dates
                if (doctor.slots_booked[slotDate].length === 0) {
                    delete doctor.slots_booked[slotDate];
                }

                await doctor.save();
            }
        }

        res.status(200).json({ success: true, message: "Appointment cancelled and slot released" });
    } catch (error) {
        console.error("Cancel appointment error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};





// Delete all cancelled appointments for a user
module.exports.deleteCancelledAppointments = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await appointmentModel.deleteMany({
            userId,
            cancelled: true,
        });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} cancelled appointments removed.`,
        });
    } catch (err) {
        console.error("Delete cancelled appointments error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


//Mark Paid Appointment
module.exports.markPaid = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
        res.json({ success: true, message: 'Payment marked as complete' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update payment status' });
    }
};
  
  

  