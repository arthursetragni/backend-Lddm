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

    static async pegaServico(req, res) {
        const  id  = req.params.id; // Captura o ID dos parâmetros da rota

        try {
            const servico = await Servico.findById(id); // Busca o serviço pelo ID
            if (!servico) {
                console.log("nao achou" + " " + id)
                return res.status(404).json({ msg: "Serviço não encontrado" });
            }
            console.log(servico);
            res.status(200).json({ msg: "Serviço encontrado", servico });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor.' });
        }
    }
    //não testado ainda
    static async buscaServicoPorIdCategoria(req, res) {
        const { idCategoria } = req.params;
    
        if (!idCategoria) {
            return res.status(400).json({ msg: "ID da categoria não informado." });
        }
    
        try {
            // Busca os serviços com a categoria especificada
            const servicos = await Servico.find({ categoria: idCategoria });
    
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
    
}

module.exports = ServicoController;