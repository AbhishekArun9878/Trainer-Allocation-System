const admin = require('firebase-admin');
const serviceAccount = require('./trainer-allocation-system-firebase-adminsdk-ve7mq-d66b848e99.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;