const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class LoginController{
    async LoginUser(req,res){
        const { email, password } = req.body;


        // Validações
    
        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }
        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }
    
        // Checar se o usuário existe
    
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }
    
        // Checar se a senha bate
    
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(404).json({msg: 'Senha inválida'});
        }
        try {
            const secret = process.env.SECRET;
            const token = jwt.sign({
                id: user._id
            },
            secret);
    
            res.status(200).json({msg: "Autenticação realizada com sucesso", token})
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
        }
    }
}

module.exports = new LoginController();