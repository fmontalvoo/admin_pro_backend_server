const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    image: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false
    },
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;