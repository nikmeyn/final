const express = require('express');
const router = express.Router();

//Login Page
router.get('/login',  (req, res) => res.send('Login'));

module.exports = router;