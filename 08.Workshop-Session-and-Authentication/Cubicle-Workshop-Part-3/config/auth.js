const User = require('../models/User');
const bcrypt = require('bcrypt');

async function register(username, password, repeatPassword) {
    password = await bcrypt.hash(password, 8);
    await User.create({ username, password });
}

module.exports = () => (req, res, next) => {
    req.auth = {
        register
    };
    next();
}