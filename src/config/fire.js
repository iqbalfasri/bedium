import * as firebase from 'firebase';
// Initialize Firebase
const config = {
  apiKey: "AIzaSyCyVd6qMAB8RSMBn829tVbPdDePW6s3ark",
  authDomain: "reactfrbase.firebaseapp.com",
  databaseURL: "https://reactfrbase.firebaseio.com",
  projectId: "reactfrbase",
  storageBucket: "reactfrbase.appspot.com",
  messagingSenderId: "1096334183390"
};

const fire = firebase.initializeApp(config);

// Provider for Google Signin
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const TimeStamp = firebase.database.ServerValue.TIMESTAMP;

export default fire;