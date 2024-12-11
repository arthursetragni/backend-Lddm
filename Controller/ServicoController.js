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
        const  id  = req.params.id; // Captura o ID dos parâmetros da rota

        try {
            const servico = await Servico.findById(id); // Busca o serviço pelo ID
            if (!servico) {
                console.log("nao achou" + " " + id)
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
    //não testado ainda
    static async buscaServicoPorNumeroCategoria(req, res) {
        const { categoria } = req.query;
    
        if (!categoria) {
            return res.status(400).json({ msg: "Categoria não informada." });
        }
    
        // Verifica se a categoria fornecida é um número inteiro
        if (isNaN(categoria) || Number(categoria) <= 0) {
            return res.status(400).json({ msg: "Categoria inválida." });
        }
    
        try {
            // Realiza a busca pelos serviços da categoria fornecida
            const servicos = await Servico.find({ categoria: Number(categoria) });
    
            if (servicos.length === 0) {
                return res.status(404).json({ msg: "Nenhum serviço encontrado para a categoria informada." });
            }
    
            // Retorna os serviços encontrados
            res.status(200).json({ msg: "Serviços encontrados", servicos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro no servidor." });
        }
    }
    

    //buscar serviços por nome da categoria
    static async buscarServicoPorNomeCategoria(req, res) {
        const { nomeCategoria } = req.params;
    
        if (!nomeCategoria) {
            return res.status(400).json({ msg: "Nome da categoria não informado." });
        }
    
        try {
            // Busca os serviços com a categoria especificada
            const servicos = await Servico.find({ categoria: nomeCategoria });
    
            if (servicos.length === 0) {
                return res.status(404).json({ msg: "Nenhum serviço encontrado para esta categoria." });
            }
    
            // Retorna os serviços encontrados
            res.status(200).json({ msg: "Serviços encontrados", servicos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro no servidor." });
        }
    }
    
    //não testado ainda
    static async buscaServicoPorTexto(req, res) {
        const { texto } = req.query;
    
        if (!texto) {
            return res.status(400).json({ msg: "Texto de busca não informado." });
        }
    
        try {
            // Realiza a busca utilizando expressões regulares
            const servicos = await Servico.find({
                $or: [
                    { descricao: { $regex: texto, $options: "i" } }, // Busca na descrição (case insensitive)
                    { titulo : {$regex: texto, $options: "i"}},
                    // { autor: { $regex: texto, $options: "i" } }  seroia legal colocar autor, mas aí tem que buscar por id na tabela user
                ]
            });
    
            if (servicos.length === 0) {
                return res.status(404).json({ msg: "Nenhum serviço encontrado para o termo pesquisado." });
            }
    
            // Retorna os serviços encontrados[]
            res.status(200).json({ msg: "Serviços encontrados", servicos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro no servidor." });
        }
    }
    static async atualizarTipoServico(req, res) {
        const id = req.params.id; // Captura o ID do serviço da URL
        const { tipo } = req.body; // Captura o campo 'tipo' do corpo da requisição
    
        if (!tipo) {
            return res.status(400).json({ msg: "O tipo do serviço não foi informado." });
        }
    
        try {
            // Atualiza apenas o campo 'tipo' do serviço especificado
            const servicoAtualizado = await Servico.findByIdAndUpdate(
                id,
                { tipo },
                { new: true } // Retorna o documento atualizado
            );
    
            if (!servicoAtualizado) {
                return res.status(404).json({ msg: "Serviço não encontrado." });
            }
    
            res.status(200).json({ msg: "Tipo do serviço atualizado com sucesso.", servico: servicoAtualizado });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro ao atualizar o serviço." });
        }
    }
    
    
}

module.exports = ServicoController;