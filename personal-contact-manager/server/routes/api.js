const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

// Connection string
var uri = 'mongodb+srv://poopsquad:poopsquad@poop-cluster-yv2oe.mongodb.net/personal-contact-manager';

const connection = (closure) => {
    return MongoClient.connect(uri, (err, client) => {
      if(err)
        console.log("Error! beeeep");

      console.log("Connected to server!");

      client.close();

    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;
