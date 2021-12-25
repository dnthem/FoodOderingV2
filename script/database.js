
import { app, ORDERS, USERS, USER_ORDERS } from "./firebase-config.js"
import {clear, menu, order_list, Total} from "./script.js"
import { getDatabase, ref, set, child, get, update, remove, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const db = getDatabase(app);


/**
* Fill the order object with necessary data
*/
function fillOrderObject () {
    let pickUpTime = document.querySelector("#pick-up-time");
    let payment = document.getElementsByName("payment");
    let userNote = document.getElementById("user-note");
    let userName = document.querySelector("#user-name");
    let userPhone = document.querySelector("#user-phone");
    let pickUpDate = document.querySelector("#pick-up-date");

    let result = {};
    result["userName"] = userName.value;
    result["userPhone"] = userPhone.value;
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

    result["pickUpDate"] = pickUpDate.value;
    result["status"] = false;
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

/**
* Store order to databse when submit button is clicked
*/
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
