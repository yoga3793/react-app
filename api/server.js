'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
// const data = require('./data');
const middleware = require('./middleware');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = "mongodb+srv://tetet.@shopping-cart-cluster-dremn.mongodb.net/shopping-cart?retryWrites=true&w=majority";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Get Products
app.get('/api/products', (req, res) => {
    MongoClient.connect(url, (err, db) => {
    var dbo = db.db("shopping-cart");
    dbo.collection("products")
    .find({})
    .toArray((err, result) => {
      db.close();
      if (err) {        
        res.json({"error" : "Database Connection Failed"}) 
      } else {
        try {
          res.json(result);
        } catch (e) {
          res.json({"error" : e}) 
        }
      }
    });
  });  
  return res;
});

// Get Product

app.post('/api/product', (req, res) => {
  
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("shopping-cart");
    var id = { "_id" : ObjectID(req.body.product_id) }
    dbo.collection("products").find(id).toArray((err, result) => {
      db.close();
      if (err) {        
        res.json({"error" : "Database Connection Failed"}) 
      } else {
        try {
          res.json(result);
        } catch (e) {
          res.json({"error" : e}) 
        }
      }
    });
  });  
  return res;
});

  // Get Cart
  app.post('/api/get-cart', (req, res) => {
    let products = [], id = null;
    let cart = JSON.parse(req.body.cart);
    if (!cart) return res.json(products);

    var cart_product_ids = Object.keys(cart).map(function(key) {
      return ObjectID(key);
    });
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("shopping-cart");
      dbo.collection("products").find({_id: {$in: cart_product_ids}}).toArray((err, result) => {
        if (err) throw err;        
        for (var i = 0; i < result.length; i++) {
          id = result[i]._id.toString();
          if (cart.hasOwnProperty(id)) {
            result[i].qty = cart[id]
            products.push(result[i]);
          }
        }
        res.json(products) 
        db.close();
      });
    });  

    
    return res;

  });

  // login user
app.post('/api/login', (req,res) => {
  let user = [];
  MongoClient.connect(url, (err, db) =>  {
    if (err) throw err;
    var dbo = db.db("shopping-cart");
    var query = { email: req.body.email , password : req.body.password };
    dbo.collection("users").find(query).toArray( (err, result) => {
           
      if (result.length){
        // create a token using user name and password vaild for 2 hours
        let token_payload = {email: result[0].email, password: result[0].password};
        let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
        let response = { message: 'Token Created, Authentication Successful!', token: token };
  
        // return the information including token as JSON
        res.status(200).json(response);
  
    } else {
        res.status("400").json("Authentication failed. admin not found.");
    }

    db.close();
    });
  return res;
  
  });

  
});

// register user

app.post('/api/register', (req,res) => {

  MongoClient.connect(url, (err, db) =>{
    if (err) throw err;phone
    var dbo = db.db("shopping-cart");
    var userObj = { phone: req.body.phone, email: req.body.email,name: req.body.name, password: req.body.password};
    dbo.collection("users").insertOne(userObj, (err, result) =>{
      if(err){  
        res.status(400).json({message : 'Registration Failed'})  
      }  
      else{  
        res.status(200).json({result: 'user registred'});
      }       
      db.close();
    });
  });
  return res;
});



// Get Cart
app.post('/api/get-cart00', (req, res) => {
  
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("shopping-cart");
    dbo.collection("cart").find({user_id: req.body.user_id}).toArray((err, result) => {
      if (err) throw err;
      res.json(result) 
      console.log(result.name);
      db.close();
    });
  });  


  MongoClient.connect(url, function (err, client) {
    
  var db = client.db("shopping-cart");
  var collection = db.collection("products");
  
  var options = {
      allowDiskUse: true
  };
  
  var pipeline = [
      {
          "$project": {
              "_id": 0,
              "s": "$$ROOT"
          }
      }, 
      {
          "$lookup": {
              "localField": "s._id",
              "from": "cart",
              "foreignField": "product_id",
              "as": "c"
          }
      }, 
      {
          "$unwind": {
              "path": "$c",
              "preserveNullAndEmptyArrays": false
          }
      }, 
      {
          "$project": {
              "s.name": "$s.name",
              "s.available_quantity": "$s.available_quantity",
              "s.price": "$s.price",
              "s.description": "$s.description",
              "s.image": "$s.image",
              "c._id": "$c._id",
              "c.quantity": "$c.quantity",
              "_id": 0
          }
      }
  ];
  
  var cursor = collection.aggregate(pipeline, options);
  
  cursor.forEach(
      function(doc) {
          console.log(doc);
      }, 
      function(err) {
          client.close();
      }
  );
  
  // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/
  
});
  return res;
});

// Update cart

app.post('/api/update-cart', (req, res) => {
  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < data.products.length; i++) {
    id = data.products[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      data.products[i].qty = cart[id]
      products.push(data.products[i]);
    }
  }
  return res.json(products);
});




const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');

