const mongoose = require('mongoose');

// Objeto

const User = mongoose.model('User',{
    name: String,
    email: String,
    password: String,
})

module.exports = User;