import firebase from "firebase";
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyDuqnRd9XXakq7k0pkuRf7IFJ14_91we1o",
    authDomain: "chat-app-c1240.firebaseapp.com",
    projectId: "chat-app-c1240",
    storageBucket: "chat-app-c1240.appspot.com",
    messagingSenderId: "367897512693",
    appId: "1:367897512693:web:384a804af22381d825d3bc",
    measurementId: "G-T8CGMW60X1"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth;
const db = firebase.firestore;
export {db, auth};
export default firebase;
