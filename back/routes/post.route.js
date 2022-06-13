const express = require('express');
const router = express.Router();
//importe le model de notre objet ici post
const postCtrl = require('../controllers/post.controller');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/*---------------- CRUD -----------------*/
//réponse pour requête de type post
router.post('/', auth, multer, postCtrl.createPost);
  
//requête de type put pour modifier l'objet
router.put('/:id', auth, multer, postCtrl.modifyPost);
  
//requête de type delete pour supprimer l'objet
router.delete('/:id', auth, postCtrl.deletePost);
  
//réponse pour requête de type get
router.get('/:id', auth, postCtrl.getOnePost);

//réponse pour requête de type get all
router.get('/', auth, postCtrl.getAllPosts);

//POST : like/dislike
router.post("/:id/like", auth, postCtrl.likePosts);
  
  
//on exporte le router pour y accéder depuis les autres fichier du projet
module.exports = router;