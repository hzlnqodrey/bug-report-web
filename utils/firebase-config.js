// // Firebase - Firestore setting 
var admin = require("firebase-admin");

var serviceAccount = require("../utils/auth/serviceAccountKey.json");

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'devthisable.firebaseapp.com'
    });
}

const db = admin.firestore()

module.exports = db