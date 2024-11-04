const mongoose = require('mongoose');

const Avaliacao = mongoose.model('Avaliacao',{
    id: String,
    ID_Avaliado: String,
    ID_Avaliador: String,
    ID_Serviço: String,
    comentario: String,
    nota: Int,
    data: Date,
})

module.exports = Avaliacao;