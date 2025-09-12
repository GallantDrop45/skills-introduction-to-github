const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/usuarios', async (req, res) => {
    const usuario = req.body;
    await axios.post('http://localhost:3000/pedidos', {userId: usuario.id});

    res.send({message: 'Usuário criado e pedido associado com sucesso!'});

});
app.listen(4000,() => {
    console.log('User Service running on port 4000');
});

