const mongoose = require('mongoose');
//const myValidator = require('validator');

const PSEUDO_MIN_LENGTH = 3
const PASSWORD_MIN_LENGTH = 10

const UserSchema = new mongoose.Schema({
    "email": {
        type: String,
        unique: true,
        /*validate : {
            validator: (value) => {
                return /([A-Za-z0-9]*)@([A-Za-z0-9]*)\.([A-Za-z0-9]{1,5})/.test(value);
            }, 
            message: "Invalid email address !"
        }*/
    },
    "pseudo": {
        type: String,
        minlength: [PSEUDO_MIN_LENGTH, `Your pseudo must be at least ${PSEUDO_MIN_LENGTH} characters`]
    },
    "password": {
        type: String,
        minlength: [PASSWORD_MIN_LENGTH, `Your password must be at least ${PASSWORD_MIN_LENGTH} characters`]
    },
    "role": {
        type: String
    }
});

module.exports = mongoose.model('user', UserSchema);
