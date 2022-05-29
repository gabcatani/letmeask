import firebase from "firebase/app";

import 'firebase/auth';
import 'firebase/database';     


const firebaseConfig = {
  apiKey: "AIzaSyBCuBe38L1zMZi4vJHm1Y2sdoCL1AlmAAs",
  authDomain: "letmeask-e5dfc.firebaseapp.com",
  databaseURL: "https://letmeask-e5dfc-default-rtdb.firebaseio.com",
  projectId: "letmeask-e5dfc",
  storageBucket: "letmeask-e5dfc.appspot.com",
  messagingSenderId: "565739632401",
  appId: "1:565739632401:web:df88b23681c30599d5beb0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database};