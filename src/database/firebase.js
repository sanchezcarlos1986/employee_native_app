import firebase from 'firebase';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDqvpIpMq7Tc2Jg4gtCVRIOZAglVW_NXYs',
  authDomain: 'employee-native-app.firebaseapp.com',
  projectId: 'employee-native-app',
  storageBucket: 'employee-native-app.appspot.com',
  messagingSenderId: '1085624293716',
  appId: '1:1085624293716:web:1694bb8f0abfe52e1bd0c1',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
