const Servico = require('../models/Servico');


class ServicoController{
    static async criaServico(req, res){
        const { 
            titulo,
            descricao,
            tipo,
            categoria,
            imagens,
            cep,
            data_criacao,
            preco_acordado,
            id_criador,
            id_executor 
        } = req.body;


        const servico = new Servico({
            titulo,
            descricao,
            tipo,
            categoria,
            imagens,
            cep,
            data_criacao,
            preco_acordado,
            id_criador,
            id_executor 
        })

        try {
            await servico.save();
            console.log(servico.id)
            res.status(201).json({ msg: 'Serviço criado com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor.' });
        }
    }

    static async pegaServicos(req, res){
        const servicos = await Servico.find({});
        if (!servicos) {
            return res.status(404).json({ msg: "Nenhum serviço encontrado" });
        }

        try {
            res.status(200).json({msg: "Lista de seriviços encontrada", servicos})
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
        }
    }
}

module.exports = ServicoController;