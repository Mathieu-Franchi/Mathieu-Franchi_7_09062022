const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, match:"/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i"},
    password: { type: String, required: true, match: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" },
    name : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
    lastname : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);