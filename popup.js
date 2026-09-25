import { initializeApp } from "./firebase-app.js";
import { getDatabase } from "./firebase-database.js";


const firebaseConfig = {
  databaseURL: process.env.DATABASE_URL,
  apiKey: "AIzaSyD79_z0tdFvAFyDxSooRSF3MQdCEXzARNE",
  authDomain: "lead-tracker-app-8f73e.firebaseapp.com",
  projectId: "lead-tracker-app-8f73e",
  storageBucket: "lead-tracker-app-8f73e.firebasestorage.app",
  messagingSenderId: "607830310000",
  appId: "1:607830310000:web:be088e16d2f5db545388b5",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)


console.log(app);
console.log(database);
