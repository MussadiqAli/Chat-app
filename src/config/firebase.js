import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyDUcyhN48ewaKSHFFJLppY820MgoZAM7eA",
    authDomain: "chatapp-react-firebase-4e17c.firebaseapp.com",
    projectId: "chatapp-react-firebase-4e17c",
    storageBucket: "chatapp-react-firebase-4e17c.appspot.com",
    messagingSenderId: "79749978053",
    appId: "1:79749978053:web:1db66a8509958ba59b5dac",
    measurementId: "G-K4MC7KQHN0"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
  