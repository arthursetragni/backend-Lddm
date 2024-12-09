const Avaliacao = require('../models/Avaliacao');

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
            console.log(novaAvaliacao.id);
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

    static async buscarAvaliacoes(req, res){
        const avaliacoes = await Avaliacao.find({});
        if (!avaliacoes) {
            return res.status(404).json({ msg: "Nenhuma avaliação encontrada" });
        }

        try {
            res.status(200).json({msg: "Lista de avaliações encontradas", avaliacoes})
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
        }
    }

    static async buscaAvaliacaoID(req, res) {
        const  id  = req.params.id; // Captura o ID dos parâmetros da rota

        try {
            const avaliacao = await Avaliacao.findById(id); // Busca o serviço pelo ID
            if (!avaliacao) {
                console.log("Não encontrada" + " " + id)
                return res.status(404).json({ msg: "Avaliação não encontrada" });
            }
            console.log(avaliacao);
            res.status(200).json({ msg: "Avaliação encontrada", avaliacao});
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor.' });
        }
    }

    static async buscarAvaliacaoEspecifica(req, res) {
        const { ID_Avaliador, ID_Avaliado, ID_Servico } = req.query;
    
        // Validações dos parâmetros obrigatórios
        if (!ID_Avaliador || !ID_Avaliado || !ID_Servico) {
            return res.status(400).json({ msg: "Os parâmetros ID_Avaliador, ID_Avaliado e ID_Servico são obrigatórios." });
        }
    
        try {
            // Busca uma avaliação com os critérios especificados
            const avaliacao = await Avaliacao.findOne({
                ID_Avaliador,
                ID_Avaliado,
                ID_Servico
            });
    
            // Verifica se a avaliação foi encontrada
            if (!avaliacao) {
                return res.status(404).json({ msg: "Avaliação específica não encontrada." });
            }
    
            // Retorna a avaliação encontrada
            res.status(200).json({ msg: "Avaliação encontrada", avaliacao });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro no servidor.", error: error.message });
        }
    }
    

}

module.exports = DataAvaliacaoController;
