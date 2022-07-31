const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String, required: true },
    name : { type : String, required: true, match: /^[a-z ,.'-]+$/i },
    lastname : { type : String, required: true, match: /^[a-z ,.'-]+$/i },
    photo: {type : String, /* match: /([^\s]+(\.(?i)(jpg|png|gif|bmp))$)/*/}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);