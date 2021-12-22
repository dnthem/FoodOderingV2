import {clear, menu, order_list, Total} from "./script.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {getDatabase, ref, set, child, get, update, remove, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGHmglcJ7m46GzjnGh5K_DoiDGSpUk0r8",
    authDomain: "firedata-35982.firebaseapp.com",
    projectId: "firedata-35982",
    storageBucket: "firedata-35982.appspot.com",
    messagingSenderId: "887258467022",
    appId: "1:887258467022:web:e51588365ce98ec8101e9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Declare database tables
const ORDERS = 'Orders';
const USERS = 'Users';
const USER_ORDERS = 'UserOrders';

function fillOrderObject () {
    let pickUpTime = document.querySelector("#pick-up-time");
    let payment = document.getElementsByName("payment");
    let userNote = document.getElementById("user-note");

    let result = {};
    order_list.forEach((item) => {
        result[menu[item.id].id] = item.quantity;
    })
    result["pickUpTime"] = pickUpTime.value;
    result["total"] = "$" + Total;
    for (let i = 0; i < payment.length; i++) {
        if (payment[i].checked) {
            result["payment"] =  payment[i].value;
            break;
        }
    }
    if (userNote.value != "")
        result["note"] = userNote.value;
    return result;
}

/**
 * This function validates user Name and user Phone
 * @param {string} userName 
 * @param {string} userPhone 
 * @returns true if either userName or userPhone is incorrect
 */
function validateValue (userName, userPhone) {
    let regName = /^[A-Za-z\s]+$/;
    let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
    return !regName.test(userName) && !regPhone.test(userPhone);
}

function submitOrder () {
    let userName = document.querySelector("#user-name");
    let userPhone = document.querySelector("#user-phone");
    if (validateValue(userName.value,userPhone.value))
    {
        alert("invalid Name or Phone");
        return;
    }
    const newOrder = fillOrderObject();

    const newKey = push(child(ref(db), ORDERS)).key;

    const updates = {};
    updates[`/${ORDERS}/` + newKey] = newOrder;
    updates[`/${USERS}/ ${userPhone.value}/` ] = userName.value;
    updates[`/${USER_ORDERS}/${newKey}`] = userPhone.value;

    update(ref(db), updates)
    .then(() => {
        clear();
        alert("Order submitted successfully")
    })
    .catch ((error) => {
        alert(error + ":" + error.message);
    });

}

document.querySelector("#submit-btn").addEventListener("click", submitOrder);