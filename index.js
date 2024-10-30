
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

const app = express();

app.use(cors());

// Config JSON response
app.use(express.json());

// Models
const User = require('./models/User');
const UserController = require('./Controller/UserController');
const DataController = require('./Controller/DataController');

// Public route
app.get('/', (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à API" });
  console.log("Bem-vindo à API");
});

// Rotas de autenticação
app.post('/auth/register', RegisterController.registerUser);
app.post('/auth/login', LoginController.LoginUser);

// Rotas update e delete  OBS: rota privada
app.post('/user/update/:id', DataController.updateUserById);
app.delete('/user/:id', DataController.deleteUserById);

// Rotas privadas
app.get("/user/:id", UserController.checkToken, UserController.getUserById);

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

// Exporta o app para ser utilizado pelo Vercel
module.exports = app;


