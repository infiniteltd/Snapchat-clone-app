import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBDAuSxOfWcC-erLyXttyqLqVMyECJ4Gzg",
    authDomain: "snapchat-clone-662e9.firebaseapp.com",
    projectId: "snapchat-clone-662e9",
    storageBucket: "snapchat-clone-662e9.appspot.com",
    messagingSenderId: "487476101653",
    appId: "1:487476101653:web:829210a9c2415406b8441c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider, serverTimestamp, ref, uploadString, getDownloadURL };