const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String, required: true },
    name : { type : String, required: true, match: /^[a-z ,.'-]+$/i, minlength: 2, maxlength: 26 },
    lastname : { type : String, required: true, match: /^[a-z ,.'-]+$/i, minlength: 2, maxlength: 16 },
    photo: {type: String, default: 'http://localhost:3000/images/placeholder_img_profil.jpg', /*match: /([^\s]+(\.(?i)(jpg|png|gif|bmp))$)/*/ },
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);