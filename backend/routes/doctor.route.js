const express =   require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const {doctorList} = require('../controllers/doctor.Controller');



router.get('/list',doctorList);




module.exports = router;
