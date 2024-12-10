
console.log("Iniciando o servidor...");

const cors = require('cors');
// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RegisterController = require('./Controller/RegisterController');
const LoginController = require('./Controller/LoginController');
const DataAvaliacaoController = require('./Controller/DataAvaliacaoController');
const ServicoController = require('./Controller/ServicoController');

const port = process.env.PORT || 3000

const app = express();

app.use(cors());

// Config JSON response
app.use(express.json());

// Models
const User = require('./models/User');
const UserController = require('./Controller/UserController');
const DataController = require('./Controller/DataController');
const Avaliacao = require('./models/Avaliacao');

// Public route
app.get('/', (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à API" });
  console.log("Bem-vindo à API");
});

//avaliacao
app.post('/avaliacao', DataAvaliacaoController.createAvaliacao);
app.get('/avaliacao', DataAvaliacaoController.buscarAvaliacoes); //todas as avaliacoes
//app.get('/avaliacao/:id', DataAvaliacaoController.buscarAvaliacaoID);
//app.delete('/avaliacao/:id', DataAvaliacaoController.deleteAvaliacaoById);

app.post('/servico', ServicoController.criaServico);
app.get('/servico', ServicoController.pegaServicos);
app.get('/servico/:id', ServicoController.pegaServico);
app.get('/servicos/busca', ServicoController.buscaServicoPorTexto);

// Rotas de autenticação
app.post('/auth/register', RegisterController.registerUser);
app.post('/auth/login', LoginController.LoginUser);

// Rotas update e delete  OBS: rota privada
app.post('/user/update/:id', DataController.updateUserById);
app.delete('/user/:id', DataController.deleteUserById);

// Rotas privadas
app.get("/user/:id", UserController.checkToken, UserController.getUserById);
// Read teste
app.get("/user2/:id", async (req,res) =>{
    const id = req.params.id;
    // checar se user existe
    const user = await User.findById(id,'-password');
    if(!user){
        return res.status(404).json({msg: 'Usuário não encontrado'});
    }
    res.status(200).json({user});
});
// Conexão com o banco de dados
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@backenddb.hyuim.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Conectou ao banco de dados");
    })
    .catch((err) => console.log(err));


// Porta do servidor
const PORT = process.env.PORT || 3000; 

// Inicia o servidor localmente
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;


