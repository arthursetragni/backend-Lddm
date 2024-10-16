// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
// Config JSON response
app.use(express.json());
// Models
const User = require('./models/User');
// Public route
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem vindo a API" });
});
// Private Route
app.get("/user/:id",checkToken, async(req,res)=>{

    const id = req.params.id;
    // Checar se user existe
    const user = await User.findById(id,'-password');

    if(!user){
        return res.status(404).json({msg:'Usuário não encontrado'});
    }
    res.status(200).json({user});
});

function checkToken(req, res, next){

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({msg:'Acesso negado!'});
    }
    // Validar se o token é correto
    try {
        const secret = process.env.SECRET;
        jwt.verify(token,SECRET);
        next();
    } catch (error) {
        res.status(400).json({msg:'Token inválido'});
    }

}

// Register User

app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    // validações
    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    if (password != confirmPassword) {
        return res.status(422).json({ msg: "As senhas não conferem!" });
    }
    // Verificar se user existe
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(422).json({ msg: "Por favor, usar outro E-mail" });
    }

    // Criar senha criptografada e com hash

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criar user
    const user = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await user.save();
        res.status(201).json({ msg: 'Usuário criado com sucesso' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
    }

});

// Login user
app.post('/auth/login', async (req, res) => {

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

});

// Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@backenddb.hyuim.mongodb.net/`)
    .then(() => {
        app.listen(3000);
        console.log("Conectou ao banco de dados");
    }).catch((err) => console.log(err));
