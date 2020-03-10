const firestoreService = require("firestore-export-import");
const serviceAccount = require("./serviceAccountKey.json")

const databaseURL = "https://universe-discovery-c7151.firebaseio.com";

firestoreService.initializeApp(serviceAccount, databaseURL);

firestoreService.restore("data.json");