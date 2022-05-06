// Hunger No Longer Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC8itX2z0wUApUIla9nnjdveSJZefzkhPg",
    authDomain: "hunger-no-longer.firebaseapp.com",
    projectId: "hunger-no-longer",
    storageBucket: "hunger-no-longer.appspot.com",
    messagingSenderId: "175325108135",
    appId: "1:175325108135:web:a04f1b193f2636ee7c0882",
    measurementId: "G-7345YYM9FN"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  // Reference Firebase storage service
  var storage = firebase.storage();