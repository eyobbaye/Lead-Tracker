import { initializeApp } from "./firebase-app.js";
import { getDatabase } from "./firebase-database.js";


const firebaseConfig = {
  databaseURL: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: procss.env.STORAGE_BUCKET,
  messagingSenderId:MESSAGING_SENDER_ID,
  appId: APP_ID,
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)


console.log(app);
console.log(database);
