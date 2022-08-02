const Post = require('../models/Post');
const fs = require('fs');
/*---------------- CRUD -----------------*/
//post
exports.createPost = (req, res, next) => {
  const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    
    //delete le faux _id envoyé par le front-end
    delete postObject._id;
    delete postObject._userId;
    //creer une nouvelle post par rapport aux champs recupérer dans le corps de la requète
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        likes:  0 ,
        dislikes:  0 
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};
//put
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post modifié!' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
//delete
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
//get one
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};
//get all
exports.getAllPosts = (req, res, next) => {
    //récupère tout les posts de la base de donnée
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

// LIKE DISLIKE
exports.likePosts = (req, res, next) => {
    //const pour simplifier la lisibilitée du code
    const like = req.body.like;
    const postId = req.params.id;
    const userId = req.body.userId;
    //on trouve le post grace à l'id recupéré dans l'url du front
    Post.findOne({ _id: postId })
    .then(function (post) {
      switch (like) {
        
        case 1:
          //verifie si l'user n'est pas déjà dans le tableau des users ayant liké
          if (!post.usersLiked.includes(userId) && like === 1) {
            //si userId n'est pas inclus  et que le front renvoie like = 1
            Post.updateOne({ _id: postId },
              { //on incrémente les likes et on push userId dans le tableau des users ayant liké
                $inc: { likes: 1 }, $push: { usersLiked: userId }
              })
              .then(function () {
                res.status(201).json({ message: "like" });
              })
              .catch(function (error) {
                res.status(400).json({ error: error });
              });
          }
          break;
        // L'utilisateur n'aime pas le post 
        case -1:
          if (!post.usersDisliked.includes(userId) && like === -1) {
            Post.updateOne({ _id: postId },
              { $inc: { dislikes: 1 }, $push: { usersDisliked: userId }, }
            )
              .then(function () {
                res.status(201).json({ message: "dislike" });
              })
              .catch(function (error) {
                res.status(400).json({ error: error });
              });
          }
          break;
        // Annulation du like par l'utilisateur
        case 0:
          if (post.usersLiked.includes(userId)) {
            Post.updateOne({ _id: postId },
              { $inc: { likes: -1 }, $pull: { usersLiked: userId }, }
            )
              .then(function () {
                res.status(201).json({ message: "like annulé" });
              })
              .catch(function (error) {
                res.status(400).json({ error: error });
              });
          }
          // Annulation du dislike 
          if (post.usersDisliked.includes(userId)) {
            Post.updateOne(
              { _id: postId },
              { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId }, }
            )
              .then(function () {
                res.status(201).json({ message: "dislike annulé" });
              })
              .catch(function (error) {
                res.status(400).json({ error: error });
              });
          }
          break;
      }
    })
    .catch(function (error) {
      res.status(404).json({ error: error });
    });
};