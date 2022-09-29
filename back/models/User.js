const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    password: { type: String, required: true },
    name:
    {
        type: String, required: true,
        match: /^(?=.{1,26}$)[a-zA-Zçäãâàáéêèëïìíîüùúûæöóòôñ]+(?:[-'\s][a-zA-Zçäãâàáéêèëïìíîüùúûöóòôæñ]+)*$/,
        minlength: 1, maxlength: 26
    },
    lastname : 
    {
        type: String, required: true,
        match: /^(?=.{2,16}$)[a-zA-Zçäãâàáéèêëïìíîüùúûæöóòôñ]+(?:[-'\s][a-zA-Zçäãâàáéêèëïìíîüùúûöóòôæñ]+)*$/,
        minlength: 2, maxlength: 16
    },
    photo: {type: String, default: null /* potential future project `${process.env.API}images/placeholder_img_profil.jpg`*/},
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);