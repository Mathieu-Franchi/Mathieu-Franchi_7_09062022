const express = require('express');
const router = express.Router();
// pour utiliser le fichier .env pour cacher le compte de la base de donnée
require('dotenv').config();
const userCtrl = require('../controllers/user.controller');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;