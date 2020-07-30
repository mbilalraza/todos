const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

router.post('/register', auth.CreateUser);
router.post('/login', auth.LoginUser);

module.exports = router;
