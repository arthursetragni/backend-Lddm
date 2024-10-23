// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RegisterController = require('./Controller/RegisterController');
const LoginController = require('./Controller/LoginController');

const app = express();
// Config JSON response
app.use(express.json());
// Models
const User = require('./models/User');
const UserController = require('./Controller/UserController');

// Public route
app.get('/', (req, res) => { res.status(200).json({ msg: "Bem vindo a API" }); });

// Rotas de autenticação
app.post('/auth/register', RegisterController.registerUser);
app.post('/auth/login', LoginController.LoginUser);

// Rotas privadas
app.get("/user/:id", UserController.checkToken, UserController.getUserById);

// Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@backenddb.hyuim.mongodb.net/`)
    .then(() => {
        app.listen(3000);
        console.log("Conectou ao banco de dados");
    }).catch((err) => console.log(err));
