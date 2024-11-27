const mongoose = require('mongoose');

const Avaliacao = mongoose.model('Avaliacao',{
    id: String,
    ID_Avaliado: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ID_Avaliador: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ID_Serviço: String,
    comentario: {type: String, default: null},
    nota: Number,
    data: {type: Date, default: Date.now},
})

module.exports = Avaliacao;
