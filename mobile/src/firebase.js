// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA_avRvZ4g9eYhEENYvZGtBPe4ImeMtwV4",
  authDomain: "cognyshoes-test-bd.firebaseapp.com",
  projectId: "cognyshoes-test-bd",
  storageBucket: "cognyshoes-test-bd.appspot.com",
  messagingSenderId: "181673829351",
  appId: "1:181673829351:web:82b474c5f43841e8625342"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
