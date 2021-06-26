const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config()

const port = process.env.PORT || 5000;
console.log(process.env.DB_USER);

app.get('/',(req, res) =>{
  res.send("test backend hiiii")
})

app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.brk1j.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection error', err);
    const contentCollection = client.db("writingRoomBlogDb").collection("contentUpload")
    console.log('database connected');
    // all blog content upload API database code (Role: Admin)
    app.get('/addContent', (req, res) => {
        contentCollection.find()
            .toArray((err, content) => {
              res.status(200).send(content)
            })
          })

    app.post('/addContentInfo', (req, res) => {
        const newContentInfo = req.body;
            console.log('adding content info', newContentInfo)
            contentCollection.insertOne(newContentInfo)
          .then(result =>{
            console.log('inserted count',result.insertedCount)
            res.send(result.insertedCount > 0)
          });
      
          });      
});

app.listen(process.env.PORT || port);

