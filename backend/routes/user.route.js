const express =   require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const { doctorList } = require('../controllers/doctor.Controller');
const { registerUser, loginUser, getUserProfile, bookAppointment, getUserAppointments , cancelAppointment, deleteCancelledAppointments, markPaid } = require('../controllers/user.Controller');
const { authUser } = require('../middlewares/AuthUser');
const { updateProfile } = require('../controllers/user.Controller')




router.post('/register', upload.single('image') ,registerUser);
router.post('/login', loginUser);
router.get('/get-profile', authUser , getUserProfile)
router.put('/update-profile/:userId', upload.single('image'), authUser, updateProfile)
router.post('/book-appointment', authUser, bookAppointment)
router.get('/my-appointments', authUser, getUserAppointments);
router.put('/cancel-appointment/:id', authUser, cancelAppointment);
router.patch('/mark-paid/:appointmentId', authUser, markPaid);



router.delete('/remove-cancelled', authUser, deleteCancelledAppointments);







module.exports = router;
