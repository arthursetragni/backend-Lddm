const Servico = require('../models/Servico');
const mongoose = require('mongoose');


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

    static async pegaServicos(req, res) {
        try {
            const idExecutor = new mongoose.Types.ObjectId('000000000000000000000000');
    
            const servicos = await Servico.find({ id_executor: idExecutor });
    
            if (!servicos || servicos.length === 0) {
                return res.status(404).json({ msg: "Nenhum serviço encontrado" });
            }
    
            res.status(200).json({ msg: "Lista de serviços encontrada", servicos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
        }
    }

    static async pegaServico(req, res) {
        const  id  = req.params.id; // Captura o ID dos parâmetros da rota

        try {
            const servico = await Servico.findById(id); // Busca o serviço pelo ID
            if (!servico) {
                console.log("nao achou" + " " + id)
                return res.status(404).json({ msg: "Serviço não encontrado" });
            }
            //console.log(servico);
            res.status(200).json({ msg: "Serviço encontrado", servico });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor.' });
        }
    }
    static async atualizaServico(req, res) {
        const { 
            id,
            id_executor 
        } = req.body; // Captura o ID dos parâmetros da rota

        const idPadrao = new mongoose.Types.ObjectId('000000000000000000000000');

        try {
            const servico = await Servico.findById(id); // Busca o serviço pelo ID
            if (!servico) {
                console.log("nao achou" + " " + id)
                return res.status(404).json({ msg: "Serviço não encontrado" });
            }
            if(servico.id_criador != id_executor && servico.id_executor.equals(idPadrao)){
                console.log("TESTE KRIA");

                servico.id_executor = id_executor;
                await servico.save();
                console.log(servico.id);
                res.status(200).json({ msg: "Serviço atualizado", servico });

            }
            else res.status(200).json({ msg: "Nada foi feito", servico });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor.' });
        }
    }
}

module.exports = ServicoController;