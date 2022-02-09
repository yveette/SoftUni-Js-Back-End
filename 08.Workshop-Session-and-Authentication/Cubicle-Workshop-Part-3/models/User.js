const { Schema, model, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [3, 'Username cannot be with less than 3 characters.'] },
    password: { type: String, required: true },
});

const User = model('User', userSchema);

module.exports = User;