const firebaseConfig = {
    apiKey: "AIzaSyD97gD5tL6qoGb-Sk3oz-XmEfh6c2cTIqE",
    authDomain: "crud-auth-firestore.firebaseapp.com",
    databaseURL: "https://crud-auth-firestore.firebaseio.com",
    projectId: "crud-auth-firestore",
    storageBucket: "crud-auth-firestore.appspot.com",
    messagingSenderId: "610790212620",
    appId: "1:610790212620:web:bd7f0b460cd5da6c4c9a29",
    measurementId: "G-4B0M1ZK43F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth()//autenticación
const db = firebase.firestore();//base de datos firestore