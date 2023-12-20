import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

//import 'bootstrap/dist/css/boostrap.css';
import './index.css';

import App from './components/App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHNjcWhZbQgYzOglf3Nol2yXI0txZLoFQ",
  authDomain: "game-hub-wi23.firebaseapp.com",
  projectId: "game-hub-wi23",
  storageBucket: "game-hub-wi23.appspot.com",
  messagingSenderId: "1013082581412",
  appId: "1:1013082581412:web:a6d0e8f0291df5cb077931"
};

// Initialize Firebase
initializeApp(firebaseConfig); // hook up to the correct app

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
