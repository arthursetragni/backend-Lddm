const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserController {

    // Middleware para verificar o token
    static checkToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: 'Acesso negado!' });
        }

        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next(); // Continua para a próxima função se o token for válido
        } catch (error) {
            return res.status(400).json({ msg: 'Token inválido' });
        }
    }

    // Rota privada para obter os dados do usuário
    static async getUserById(req, res) {
        const id = req.params.id;
        
        try {
            const user = await User.findById(id, '-password'); // Retorna o usuário sem a senha
            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado' });
            }
            res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ msg: 'Erro no servidor' });
        }
    }

}

module.exports = UserController;
