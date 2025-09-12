const express = require('express');
const app = express();

app.use(express.json());

let usuarios = [];
let pedidos = [];

// Rutas para criação de usuarios

app.post("/usuarios", (req, res) => {
    const usuario = req.body;
    usuarios.push(usuario);
    res.send({ message: "Usuário criado com sucesso!" });
});


// Rota para criar um pedido
app.post("/pedidos", (req, res) => {
    const pedido = req.body;
    pedidos.push(pedido);
    res.send({ message: "Pedido criado com sucesso!" });
});

// Rota para listar todos os pedidos e usuários
app.get("/dados", (req, res) => {
    res.send({ usuarios, pedidos });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});