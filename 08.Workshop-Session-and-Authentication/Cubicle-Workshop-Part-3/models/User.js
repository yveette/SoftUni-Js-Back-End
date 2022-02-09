const { Schema, model, Types: { ObjectId } } = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [3, 'Username cannot be with less than 3 characters.'] },
    password: { type: String, required: true },
});

/* hash password in the model before saving in database
userSchema.pre('save', function (next) {
    console.log(this);
    this.password = await bcrypt.hash(this.password, 10);
    return;
})
*/

const User = model('User', userSchema);

module.exports = User;