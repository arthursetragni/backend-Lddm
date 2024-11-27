const mongoose = require('mongoose');


const ServicoSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    tipo: String,
    categoria: Number,
    cep: String,
    data_criacao: { type: Date, default: Date.now },
    preco_acordado: Number,
    id_criador: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    id_executor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  
});

//criando modelo mongoose
const Servico = mongoose.model('Servico', ServicoSchema);

module.exports = Servico;
