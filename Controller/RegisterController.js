const bcrypt = require('bcrypt');
const User = require('../models/User');
class RegisterController {
    // Método para registrar o usuário
    async registerUser(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        // Validações
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório!" });
        }
        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }
        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }
        if (password !== confirmPassword) {
            return res.status(422).json({ msg: "As senhas não conferem!" });
        }

        // Verificar se o usuário já existe
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ msg: "Por favor, use outro e-mail!" });
        }

        // Criar senha criptografada
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Criar usuário
        const user = new User({
            name,
            email,
            password: passwordHash,
        });

        try {
            await user.save();
            console.log(user.id)
            res.status(201).json({ msg: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor.' });
        }
    }
}

module.exports = new RegisterController();