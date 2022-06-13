const mongoose = require('mongoose');
var commentairePostSchema = new mongoose.Schema({
  name : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  contenu : String,
  date : { type : Date, default : Date.now }
});
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String  },
  
  comment: {commentairePostSchema},
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [String],
  usersDisliked: [String]
});

module.exports = mongoose.model('Post', postSchema);