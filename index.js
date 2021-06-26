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
    // const serviceCollection = client.db("carRepair").collection("servicebook");
    // const feedbackCollection = client.db("carRepair").collection("userfeedback");
    // const userOrderCollection = client.db("carRepair").collection("orders");
    // const adminCollection = client.db("carRepair").collection("admin");

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

    // all car service books API database code (Role: Admin)
//    app.get('/servicebook', (req, res) => {
//     serviceCollection.find()
//     .toArray((err, service) => {
//       res.status(200).send(service)
//     })
//   })

//   app.post('/addServiceInfo', (req, res) => {
//       const newServiceInfo = req.body;
//       console.log('adding service info', newServiceInfo)
//       serviceCollection.insertOne(newServiceInfo)
//     .then(result =>{
//       console.log('inserted count',result.insertedCount)
//       res.send(result.insertedCount > 0)
//     });

//     });

    // delete specific service API (Role : Admin)
    // app.delete('/deleteService/:id', (req, res) => {
    //   const id = ObjectID(req.params.id);
    //   serviceCollection.deleteOne({_id: id})
    //   .then(result => {
    //     console.log(result);
    //   })
    // })

    // testimonial user feedback API (Role : User)

    // app.get('/userfeedback', (req, res) => {
    //   feedbackCollection.find()
    //   .toArray((err, feedback) => {
    //     res.status(200).send(feedback)
    //   })
    // })

    // app.post('/userFeedbackInfo', (req, res) => {
    //   const newUserFeedback = req.body;
    //   console.log('adding service info', newUserFeedback)
    //   feedbackCollection.insertOne(newUserFeedback)
    // .then(result =>{
    //   console.log('inserted count',result.insertedCount)
    //   res.send(result.insertedCount > 0)
    // });

    // });

    //all order show API (Role : Admin)
    // app.get('/orders', (req, res) => {
    //   userOrderCollection.find({})
    //   .toArray((err, documents) => {
    //       res.send(documents);
    //   })
    // })
    
    
    // app.post('/addOrder', (req, res) => {
    //       const newOrder = req.body;
    //       console.log(newOrder)
    //       userOrderCollection.insertOne(newOrder)
    //     .then(result => {
    //       console.log(result)
    //       res.send(result.insertedCount > 0);
    //     })
    // })

    // // show specific order service API (Role : User)
    // app.get('/specificOrders', (req, res) => {
    //   userOrderCollection.find({email: req.query.email})
    //   .toArray((err, documents) => {
    //       res.send(documents);
    //   })
    // })

    // Load Single Order
//   app.get('/order/:id', (req, res) => {
//     const id = ObjectID(req.params.id);
//     userOrderCollection.find({_id: id})
//     .toArray((err, documents) => {
//       res.send(documents[0]);
//     })
//   })

  // Data Update API
//   app.patch('/updateOrder/:id', (req, res) => {
//     const id = ObjectID(req.params.id);
//     userOrderCollection.updateOne(
//       {_id: id},
//       {
//         $set: {status: req.body.status}
//       }
//     )
//     .then(result => {
//       console.log('updated');
//     })
//   })
    
    
    // app.post('/addOrder', (req, res) => {
    //       const newOrder = req.body;
    //       console.log(newOrder)
    //       userOrderCollection.insertOne(newOrder)
    //     .then(result => {
    //       console.log(result)
    //       res.send(result.insertedCount > 0);
    //     })
    // })

    // admin collection API

    // Admin Collections Setup
    // app.post('/addAdmin', (req, res) => {
    //   const newAdmin = req.body;
    //   console.log(newAdmin);
    //   adminCollection.insertOne(newAdmin)
    //   .then(result => {
    //     console.log('inserted count:', result.insertedCount);
    //     res.send(result.insertedCount > 0)
    //   })
    // })

    // Orders by email
    // app.get('/admin', (req, res) => {
    //   adminCollection.find({adminEmail: req.query.email})
    //   .toArray((err, documents) => {
    //     res.send(documents[0]);
    //   })
    // })

});

app.listen(process.env.PORT || port);

