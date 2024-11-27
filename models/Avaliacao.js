const mongoose = require('mongoose');

const Avaliacao = mongoose.model('Avaliacao',{
    id: String,
    ID_Avaliado: String,
    ID_Avaliador: String,
    ID_Serviço: String,
    comentario: {type: String, default: null},
    nota: {type: Number, default: null},
    data: {type: Date, default: null},
})

module.exports = Avaliacao;
