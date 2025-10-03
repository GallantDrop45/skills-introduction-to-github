require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
if(!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const orderSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    items:{type: Number, default: []},
    total:{type: Number, default: 0},
    createdAt:{ type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
 app.post('/orders', async (req, res) => {
    try {
        const { userId, items = [], total = 0 } = req.body;
          if(!userId) 
            return res.status(400).json({ message: "userId is required" });

            const order = new Order({ userId, items, total });
            const saved = await order.save();
            console.log(`Pedido criado: ${saved_id} para o usuário ${userId}`);
            res.status(201).json(saved);           
          } catch (error) {
            console.error('Erro ao criar pedido:', error);
            res.status(500).json({ message: 'Erro ao criar pedido' });
          }
        });

        app.get('pedidos', async (req, res) => {
            try {
                const orders = await Order.find().sort({ createdAt: -1 });
                return res.json(orders);
            }catch (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar pedidos' });
            }
        });

        app.listen(4000, () => {
            console.log('Order service running on port 4000');
        });