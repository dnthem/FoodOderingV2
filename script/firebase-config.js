import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'; 
 const firebaseConfig = { 
    apiKey:  process.env.API_KEY, 
    authDomain: 'firedata-35982.firebaseapp.com', 
    projectId: 'firedata-35982', 
    storageBucket: 'firedata-35982.appspot.com',
    messagingSenderId: '887258467022', 
    appId: '1:887258467022:web:e51588365ce98ec8101e9f'}; 


const ORDERS = 'Orders'; 
const USERS = 'Users';
const USER_ORDERS = 'UserOrders';
const app = initializeApp(firebaseConfig); 
export { app, ORDERS, USERS, USER_ORDERS };
