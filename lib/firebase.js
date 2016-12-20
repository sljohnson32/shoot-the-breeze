import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBvq9SKR3czZ5e8BQrOzsvhpK0Dn2trtts",
  authDomain: "shoot-the-breeze-8b841.firebaseapp.com",
  databaseURL: "https://shoot-the-breeze-8b841.firebaseio.com",
  storageBucket: "shoot-the-breeze-8b841.appspot.com",
  messagingSenderId: "29061638191"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => firebase.auth().signOut();
export const reference = firebase.database().ref('messages');
