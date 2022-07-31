// pour utiliser le fichier .env pour cacher le compte de la base de donnée
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.signup = (req, res, next) => {
   let password = req.body.password;
   //Minimum 6 and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
   let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/;
   if (regex.test(password) === false){
    res.status(400).json({ message: 'Mot de passe invalide'})
   }
   else {
    bcrypt.hash(password, 10)
     .then(hash => {
         const user = new User({
             email: req.body.email,
             password : hash,
             name : req.body.name,
             lastname : req.body.lastname
         });
         user.save()
         .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
         .catch(error => res.status(400).json({error}));
     })
     .catch(error => res.status(500).json({error}));
   }
}
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(//payload
              { userId: user._id },
              process.env.TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
exports.getUserInfos = (req, res, next) => {
  User.findOne({userId: req.params.userId})
  .then(user => res.status(200).json(user))
  .catch(error => res.status(404).json({ error }));
    
};