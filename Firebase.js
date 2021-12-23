import firebase from "firebase";
// import * as firebase from "firebase/app";
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCNkZd0NsRGOMX92pe9Kex7dH7iwM3d0DU",
    authDomain: "lets-talk-c4151.firebaseapp.com",
    projectId: "lets-talk-c4151",
    storageBucket: "lets-talk-c4151.appspot.com",
    messagingSenderId: "96755694106",
    appId: "1:96755694106:web:9be8e5947f69f662c7efa3"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebase.firestore();

// const storage = getStorage();

// const app =!getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
// const db = getFirestore();

export {db, auth, provider};