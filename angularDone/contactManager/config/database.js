const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
  uri: 'mongodb://localhost:27017/angular', // Databse URI and database name
 // uri 'mongodb://poopsquad:poopsquad@poop-cluster-shard-00-00-yv2oe.mongodb.net:27017,poop-cluster-shard-00-01-yv2oe.mongodb.net:27017,poop-cluster-shard-00-02-yv2oe.mongodb.net:27017/personal-contact-manager?ssl=true&replicaSet=POOP-Cluster-shard-0&authSource=admin',

  secret: crypto, // Cryto-created secret
  //db: process.env.databaseName // Database name
  db: 'angular'
}