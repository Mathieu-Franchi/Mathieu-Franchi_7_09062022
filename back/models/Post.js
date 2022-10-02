const mongoose = require('mongoose');
/* potential future project */
// let commentairePostSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   name: { type : String, match: /^[a-z ,.'-]+$/i },
//   lastname : { type : String, match: /^[a-z ,.'-]+$/i },
//   contenu: String,
//   imageUrl: { type: String },
//   date: { type: Date, default: Date.now },
//   likes: { type: Number },
//   usersLiked: [ObjectLiked],
// });
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  photo: {type: String },
  name : { type : String, required: true, match: /^(?=.{1,26}$)[a-zA-Zçäãâàáéêèëïìíîüùúûæöóòôñ]+(?:[-'\s][a-zA-Zçäãâàáéêèëïìíîüùúûöóòôæñ]+)*$/ },
  lastname : { type : String, required: true, match: /^(?=.{2,16}$)[a-zA-Zçäãâàáéèêëïìíîüùúûæöóòôñ]+(?:[-'\s][a-zA-Zçäãâàáéêèëïìíîüùúûöóòôæñ]+)*$/ },
  description: { type: String },
  imageUrl: { type: String, default: null },
  date: { type: Date, default: Date.now },
  // comment: {commentairePostSchema},
  likes: { type: Number },
  // dislikes: { type: Number },
  usersLiked: [String],
  // usersDisliked: [String]
});

module.exports = mongoose.model('Post', postSchema);