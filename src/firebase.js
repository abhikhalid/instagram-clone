import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCHoipokBc02RTycZp4sDmFhO5JZHIpAlA",
    authDomain: "instagram-clone-2-32cc3.firebaseapp.com",
    projectId: "instagram-clone-2-32cc3",
    storageBucket: "instagram-clone-2-32cc3.appspot.com",
    messagingSenderId: "161053976272",
    appId: "1:161053976272:web:16c16f8b01e029e7f6a0d5"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage};

// export default db;