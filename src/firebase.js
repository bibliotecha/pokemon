import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); // 認証をするにあたって必要になってくる諸々のツール
const googleAuth = new firebase.auth.GoogleAuthProvider(); // Googleの認証を使うためのツール

const firestore = firebase.firestore()

//　必ずenvが読み込まれた確認すること！
// console.log(firebaseConfig.apiKey);

export { auth, googleAuth, firestore };
