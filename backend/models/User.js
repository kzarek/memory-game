const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
});

module.exports = model('User', userSchema);