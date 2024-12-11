const mongoose = require('mongoose');

const Categoria = mongoose.model('Categoria',{
    nome: String,
})

module.exports = Categoria;