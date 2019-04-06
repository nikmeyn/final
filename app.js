const express = require('express');
const parser = require('body-parser');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://admin-1:passwordadmin-1@web3-asg2-rk0iv.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "mytravels";

const app = express();

// serves up static files from the public folder. 
app.use(express.static('client'));
app.use(express.static(path.join(__dirname, 'client/build')));

// setup express middleware
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

var database, collection;

app.listen(8080, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("images");
      console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

app.get("/api/images", (request, response) => {
  collection.find({}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });