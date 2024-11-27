const mongoose = require('mongoose');

// Objeto

const User = mongoose.model('User',{
    name: String,
    email: String,
    password: String,
    gender: {type:String, default:null},
    telephone: {type:String, default:null},
    adress: {type:String, default:null},
    date_of_birth: {type:String, default:null},
})

module.exports = User;