import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAuPLMsRJ6ALj6fpz95CsplSlp7Bpu_7Ww",
    authDomain: "trainer-allocation-system.firebaseapp.com",
    projectId: "trainer-allocation-system",
    storageBucket: "trainer-allocation-system.appspot.com",
    messagingSenderId: "981502923951",
    appId: "1:981502923951:web:fc616b384c3266b29db05a"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
