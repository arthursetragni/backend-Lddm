const mongoose = require('mongoose');

const AvaliacaoSchema = mongoose.Schema({
    ID_Avaliado: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ID_Avaliador: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ID_Serviço: { type: mongoose.Schema.Types.ObjectId, ref: 'Servico' },
    comentario: {type: String, default: null},
    nota: Number,
    data: {type: Date, default: Date.now},
})

const Avaliacao = mongoose.model('Avaliacao', AvaliacaoSchema);

module.exports = Avaliacao;

