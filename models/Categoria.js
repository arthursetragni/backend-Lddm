const mongoose = require('mongoose');

const Categoria = mongoose.model('Categoria',{
    id: String,
    nome: String,
})

module.exports = Categoria;