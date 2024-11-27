const Avaliacao = require('../models/Avaliacao');
const mongoose = require('mongoose');

class DataAvaliacaoController {

    static async createAvaliacao(req, res) {
        const { ID_Avaliado, ID_Avaliador, ID_Servico, comentario, nota } = req.body;

        // Validações básicas dos campos
        if (!ID_Avaliado || !ID_Avaliador || !ID_Servico || nota == null) {
            return res.status(400).json({ msg: 'Preencha todos os campos obrigatórios' });
        }
        //como vai selecionar as estrelinhas esse erro nunca vai acontecer, mas é melhor prevenir
        if (typeof nota !== 'number' || nota < 0 || nota > 5) {
            return res.status(400).json({ msg: 'A nota deve ser um número entre 0 e 5' });
        }

        try {
            const novaAvaliacao = new Avaliacao({
                ID_Avaliado,
                ID_Avaliador,
                ID_Servico,
                comentario: comentario || null,
                nota,
                data: new Date()
            });

            const resp = await novaAvaliacao.save();
            res.status(201).json({ msg: 'Avaliação criada com sucesso', resp });
        } catch (error)  {
            return res.status(500).json({ msg: 'Erro no servidor ao criar a avaliação', error: error.message });
        }  
    }

    // Rota para excluir avaliação
    static async deleteAvaliacaoById(req, res) {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }

        try {
            const resp = await Avaliacao.findByIdAndDelete(id);
            if (!resp) {
                return res.status(404).json({ msg: 'Avaliação não encontrada' });
            }
            res.status(200).json({ msg: 'Avaliação excluída com sucesso' });
        } catch (error) {
            return res.status(500).json({ msg: 'Erro no servidor', error: error.message });
        }
    }

    // Rota para atualizar avaliação
    static async updateAvaliacaoById(req, res) {
        const id = req.params.id;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }

        try {
            const resp = await Avaliacao.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
            if (!resp) {
                return res.status(404).json({ msg: 'Avaliação não encontrada' });
            }
            res.status(200).json({ msg: 'Avaliação atualizada com sucesso', resp });
        } catch (error) {
            return res.status(500).json({ msg: 'Erro no servidor', error: error.message });
        }
    }
}

module.exports = DataController;
