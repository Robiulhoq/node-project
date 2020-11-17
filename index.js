const express = require('express');
const app = express();
const  cors = require('cors');
app.use(cors);
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rakib:GGnb6NLRtWNf21Z9@cluster0.tx9ov.mongodb.net/organicbd?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


client.connect(err => { 
  const collection = client.db("organicbd").collection("products");
  app.get('/products', (req, res) => {
    collection.find({})
    .toArray((err, document) =>{
      res.send(document);
    })
  })



  app.post("/addProduct", (req, res) =>{
    const product = req.body;
    collection.insertOne(product)
    .then(result => {
      console.log('products added succefully')
      res.send('success')
    })
  })
  
});


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})
app.listen(3000)