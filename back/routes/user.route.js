const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// pour utiliser le fichier .env pour cacher le compte de la base de donnée
require('dotenv').config();
const userCtrl = require('../controllers/user.controller');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//requête de type get pour récupérer les données de l'utilisateur
router.get('/user/:id', auth, userCtrl.getUserInfos);
//requête de type put pour modifier les données de l'utilisateur
router.put('/user/:id', auth, multer, userCtrl.modifyUser);

module.exports = router;