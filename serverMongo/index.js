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
        useUnifiedTopology: true,
    });

// To handle deprecation of findAndModify mongo
mongoose.set('useFindAndModify', false);

app.post("/insert", async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const numberOfProduct = req.body.numberOfProduct;

    const products = new ProductsModel({Name: name, Price: price, Description: "Acu bag din front-end", numberOfProduct: numberOfProduct});

    try {
        await products.save();
        res.send("inserted data");
        console.log("inserted data");
    } catch(err) {
        console.log(err);
    }

});

app.get("/read", (req, res) => {
    ProductsModel.find({}, (err, result) => {
        if (err) res.send(err);

        res.send(result);
    })
});

app.put("/update", async (req, res) => {
    const newNumberOfProduct = req.body.newNumberOfProduct;
    const id = req.body.id;

    try {
        await ProductsModel.findById(id, (err, updatedProduct) => {
            updatedProduct.numberOfProduct = newNumberOfProduct;
            updatedProduct.save();
            console.log(`updated to new numberOfProduct which is ${newNumberOfProduct}`);
        })
    } catch(err) {
        console.log(err);
    }

});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    res.send(id);
    
    try {
        await ProductsModel.findByIdAndRemove(id).exec();
        console.log("deleted");
    } catch(err) {
        console.log(err);
    }

})

app.listen(3001, () => {
    console.log('Server running on port 3001');
});