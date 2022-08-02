const mongoose = require('mongoose');
var commentairePostSchema = new mongoose.Schema({
  name: { type : String, match: /^[a-z ,.'-]+$/i },
  lastname : { type : String, match: /^[a-z ,.'-]+$/i },
  contenu: String,
  date: { type: Date, default: Date.now() }
});
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name : { type : String, required: true, match: /^[a-z ,.'-]+$/i },
  lastname : { type : String, required: true, match: /^[a-z ,.'-]+$/i },
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