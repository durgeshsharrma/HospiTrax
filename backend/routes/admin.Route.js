const express =   require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const {loginAdmin} = require('../controllers/admin.Controller');
const { addDoctor } = require('../controllers/admin.Controller');
const { authAdmin } = require('../middlewares/AuthAdmin')
const { getAllDoctors, getAllAppointments, getDashboardData } = require('../controllers/admin.Controller');
const { changeAvailability } = require('../controllers/doctor.Controller');


router.post('/add-doctor', authAdmin , upload.single('image'), addDoctor);
router.get('/all-doctors', authAdmin , getAllDoctors);
router.post('/change-availability/:docId', authAdmin , changeAvailability);
router.post('/login', loginAdmin )

router.get('/all-appointments', authAdmin , getAllAppointments);


router.get('/dashboard-stats', authAdmin, getDashboardData )

module.exports = router;
