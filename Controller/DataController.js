const User = require('../models/User');
//const jwt = require('jsonwebtoken');


class DataController {
    // Rota privada para excluir o usuário
    static async deleteUserById(req, res) {
        const id = req.params.id;

            try {
                const user = await User.findByIdAndDelete(id); // Encontra e exclui o usuário
                if (!user) {
                    return res.status(404).json({ msg: 'Usuário não encontrado' });
                }
                res.status(200).json({ msg: 'Usuário excluído com sucesso' });
            } catch (error) {
                return res.status(500).json({ msg: 'Erro no servidor' });
                }
        }

        // Rota privada para atualizar os dados do usuário
        static async updateUserById(req, res) {
        const id = req.params.id;
        const updates = req.body;

            try {
                const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true, select: '-password' });
                
                if (!user) {
                    return res.status(404).json({ msg: 'Usuário não encontrado' });
                }

                res.status(200).json({ msg: 'Usuário atualizado com sucesso', user });
        } catch (error) {
                return res.status(500).json({ msg: 'Erro no servidor' });
        }
    }
}
module.exports = DataController;