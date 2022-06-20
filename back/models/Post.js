const mongoose = require('mongoose');
var commentairePostSchema = new mongoose.Schema({
  nom: { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  contenu: String,
  date: { type: Date, default: Date.now() }
});
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  nom : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  description: { type: String, required: true },
  imageUrl: { type: String  },
  date: { type: Date, default: Date.now() },
  comment: {commentairePostSchema},
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [String],
  usersDisliked: [String]
});

module.exports = mongoose.model('Post', postSchema);