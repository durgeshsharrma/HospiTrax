const doctorModel = require('../models/doctor.model');

module.exports.changeAvailability = async (req, res) => {
    try {
        const { docId } = req.params;
        console.log("Changing availability for doctor ID:", docId);
        const docData = await doctorModel.findById(docId);


        if (!docData) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        await doctorModel.findByIdAndUpdate(docId, {
            availability: !docData.availability
        });

        console.log("Availability changed successfully for doctor ID:", docId);
        res.status(200).json({ message: "Availability changed successfully" });
    }

    catch(error) {
        console.error("Error changing availability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports.doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password'); // Exclude password field
        // console.log("Fetched doctors:", doctors);
        if (doctors.length === 0) {
            console.log("No doctors found");
            return res.status(404).json({success : false, error: "No doctors found" });
        }
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}