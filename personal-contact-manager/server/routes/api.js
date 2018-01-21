const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

// Connection string
var uri = 'mongodb://poopsquad:poopsquad@poop-cluster-shard-00-00-yv2oe.mongodb.net:27017,poop-cluster-shard-00-01-yv2oe.mongodb.net:27017,poop-cluster-shard-00-02-yv2oe.mongodb.net:27017/personal-contact-manager?ssl=true&replicaSet=POOP-Cluster-shard-0&authSource=admin';

var connection = MongoClient, format = require('util').format;
MongoClient.connect(uri, function (err, client) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }

    const db = client.db('personal-contact-manager');
    var collection = db.collection('users');

    client.close();
});

// const connection = (closure) => {
//     return MongoClient.connect(uri, (err, client) => {
//         if (err)
//           return console.log(err);
//         else
//           console.log("successfully connected to the database");
//
//         client.close();
//     });
// };
//
// // Error handling
// const sendError = (err, res) => {
//     response.status = 501;
//     response.message = typeof err == 'object' ? err.message : err;
//     res.status(501).json(response);
// };
//
// // Response handling
// let response = {
//     status: 200,
//     data: [],
//     message: null
// };
//
// // Get users
// router.get('/users', (req, res) => {
//     connection((client, db) => {
//         console.log(client);
//         console.log(db);
//         client.db('personal-contact-manager').collection('users')
//           .find()
//           .toArray()
//           .then((users) => {
//             response.data = users;
//             res.json(response);
//           })
//           .catch((err) => {
//             sendError(err, res);
//           });
//     });
// });

module.exports = router;
