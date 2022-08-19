const mongoose = require('mongoose');

var commentairePostSchema = new mongoose.Schema({
  name: { type : String, match: /^[a-z ,.'-]+$/i },
  lastname : { type : String, match: /^[a-z ,.'-]+$/i },
  contenu: String,
  date: { type: Date, default: Date.now() }
});
let ObjectLiked = new mongoose.Schema({
  name: { type : String, match: /^[a-z ,.'-]+$/i },
  userId: String,
})
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  photo: {type: String },
  name : { type : String, required: true, match: /^[a-z ,.'-]+$/i },
  lastname : { type : String, required: true, match: /^[a-z ,.'-]+$/i },
  description: { type: String },
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
  comment: {commentairePostSchema},
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [ObjectLiked],
  usersDisliked: [String]
});

module.exports = mongoose.model('Post', postSchema);