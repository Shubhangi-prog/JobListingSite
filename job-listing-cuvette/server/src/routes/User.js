const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/User');
const validateUser = require('../middlewares/validateUser');

router.post('/user/login', validateUser, loginUser);
router.post('/user/register', validateUser, registerUser);

module.exports = router;