// pour utiliser le fichier .env pour cacher le compte de la base de donnée
require('dotenv').config();
// const jwt = require('jsonwebtoken');
// On importe express
const express = require('express');
// On importe helmet 
const helmet = require("helmet");
// On creer l'application à l'aide d'express
const app = express();

// importe mongoose/mongodb
const mongoose = require('mongoose');

// import path : pour accéder au chemin d'un dossier statique (ici sur notre pc)
const path = require('path');

// const cookieParser = require('cookie-parser')
// alternative à express.json
// const bodyParser = require('body-parser'); 


// import les routes à l'aide du routeur exporté dans les fichiers routes
const postRoutes = require('./routes/post.route');
const userRoutes = require('./routes/user.route');

// Connexion base de donnée MONGODB à l'aide du fichier .env (voir .env.sample pour plus d'info) 
mongoose.connect(process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//Middleware : intercepte pour la sécurité
app.use(helmet());
// Middleware  : réponse pour n'importe quelle requête
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy','cross-origin');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  'application/x-www-form-urlencoded','multipart/form-data');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//alternative à express.json
// app.use(bodyParser.json()); 

// middleware pour convertir le contenu des cookies
// app.use(cookieParser())

// middleware qui intercepte toutes les requêtes qui ont comme Content-Type  application/json pour mettre leur body dans l'objet req
app.use(express.json());

//middleware : permet les requête sur notre dossier statique "images" (sur notre pc) en donnant le chemin du dossier grâce à "path"
app.use('/images', express.static(path.join(__dirname, 'images')));

/* CRUD importé du dossier ROUTES  */

//User
app.use('/api/auth', userRoutes);
//post
app.use('/api/posts', postRoutes);

/* test refresh token futur project */
//refreshToken
//import models
// const User = require('./models/User');
// app.use('/api/refreshToken', (req, res) => {
//   const authHeader = req.headers['authorization'];
//   try {

//     const token = authHeader && authHeader.split(' ')[1];
//     const decodedRefreshToken = jwt.verify(token, process.env.REFRESH_TOKEN)
//     // User.findOne({ _id: decodedRefreshToken.userId })
//     // .then(user => {
//     //   if (user._id != decodedRefreshToken.userId && req.auth.isAdmin === false) {
//     //     res.status(401).json({ message: 'Not authorized' });
//     //   } 
//     // })
//     // .catch(error => {
//     //   res.status(404).json({ error });
//     // });
//     delete decodedRefreshToken.iat;
//     delete decodedRefreshToken.exp;
//     const refreshedToken = jwt.sign(decodedRefreshToken, process.env.TOKEN, { expiresIn: '24h' });
//     res.status(200).json({
//       token: refreshedToken
//     });
//   }
//   catch (error) {
//     res.status(401).json({ error: error | 'Requête non authentifiée !' });
//   }

// });

// on exporte l'app pour y accéder depuis les autres fichier du projet
module.exports = app;