const Avaliacao = require('../models/Avaliacao');
const mongoose = require('mongoose');

class DataController {
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
