const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const ProductsModel = require('./models/Products');

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://Andrew:descarcare@medieval.zxguo.mongodb.net/medieval?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
    });

app.post('/insert', async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;

    const products = new ProductsModel({Name: name, Price: price, Description: "Acu bag din front-end"});

    try {
        await products.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err);
    }

});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});