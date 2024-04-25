import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDElUBcjAfXuFCVJHxvUGkOn_tr10VTnvA",
  authDomain: "adv-internship-9a5e5.firebaseapp.com",
  projectId: "adv-internship-9a5e5",
  storageBucket: "adv-internship-9a5e5.appspot.com",
  messagingSenderId: "363440379457",
  appId: "1:363440379457:web:ced5ede8166a1bcdda18c0"
};

function firebase() {
    initializeApp(firebaseConfig);
  }
  
  const app = firebase();
  
  export default app;