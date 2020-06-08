import firebase from 'firebase/app';
require('firebase/storage');



const firebaseConfig = {
    apiKey: "AIzaSyDzIsnq4cO41TJoJLvGjiFDZzh6ZPkkpwg",
    authDomain: "generated-arena-265309.firebaseapp.com",
    databaseURL: "https://generated-arena-265309.firebaseio.com",
    projectId: "generated-arena-265309",
    storageBucket: "generated-arena-265309.appspot.com",
    messagingSenderId: "618895528937",
    appId: "1:618895528937:web:873761931341c834693178",
    measurementId: "G-Q0TBB34YH2"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;