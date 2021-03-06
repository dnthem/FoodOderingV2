// Declare variables
const menu_container = document.getElementById("menu");
const order_tbl = document.getElementById("order-tbl");
const menu = [
  {
    index: 0,
    id: "bttron",
    name: "Bánh Tráng Trộn",
    price: 10,
  },
  {
    index: 1,
    id: "btcuon",
    name: "Bánh Tráng Cuốn",
    price: 10,
  },
  {
    index: 2,
    id: "btsate",
    name: "Bánh Tráng Sate",
    price: 7,
  },
  {
    index: 3,
    id: "trungNuong",
    name: "Trứng Nướng (5 trứng/phần)",
    price: 7,
  },
  {
    index: 4,
    id: "dauhu",
    name: "Đậu Hũ Nước Dừa",
    price: 7,
  },
  {
    index: 5,
    id: "bapxao",
    name: "Bắp Xào",
    price: 10,
  },
];
let order_list = []; // Create empty oder_list arr
let Total = 0;

function calculateTotal(unit, quantity) {
  Total += unit * quantity;
}

function updateOrderList() {
  Total = 0;
  console.log(order_list);

  if (order_list.length > 0) {
    order_tbl.innerHTML = `
    <tr>
        <th>#</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Action</th>
    </tr>
    `;
    order_list.forEach((item, index) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      td1.innerText = index + 1;
      td2.innerText = menu[item.id].name;
      td3.innerText = item.quantity;
      td4.innerHTML = `<i style="cursor: pointer; color:red;">remove</i>`;
      bindEvent(td4, index);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      order_tbl.appendChild(tr);

      calculateTotal(menu[item.id].price, item.quantity);
      order_tbl.nextElementSibling.innerText = `Total = $${Total}`;
    });
  } else {
    order_tbl.innerHTML = "";
    let tr = document.createElement("tr");
    tr.innerHTML = `<td style="text-align: center">Your order list is empty</td>`;
    order_tbl.appendChild(tr);
    order_tbl.nextElementSibling.innerText = "";
  }
}

function bindEvent(td4, index) {
  td4.addEventListener("click", () => {
    deleteItem(index);
  });
}

function addItem(target) {
  let id = target.name;
  let qty = target.previousElementSibling;
  let qty_val = Number(qty.value); // Cast to Interger
  // If already exist then increase qty
  for (let i = 0; i < order_list.length; i++) {
    if (order_list[i].id == id) {
      order_list[i].quantity = order_list[i].quantity + qty_val;
      updateOrderList();
      return;
    }
  }
  // If not add new item to the arr
  order_list.push({ id: id, quantity: qty_val });
  updateOrderList();
}

function deleteItem(id) {
  order_list.splice(id, 1); // Remove 1 item at 'id' position
  updateOrderList();
}

function populateMenu() {
  for (let i = 0; i < menu.length; i++) {
    const newItem = document.createElement("new-dish");
    newItem.data = menu[i];
    menu_container.appendChild(newItem);
  }
}

function bindDish() {
  document.querySelectorAll("#menu > new-dish").forEach((dish) => {
    dish.shadowRoot
      .querySelector("article > div > button")
      .addEventListener("click", (event) => {
        addItem(event.target);
      });
  });
}

function clear() {
  order_list = [];
  Total = 0;
  document.querySelector("#user-name").value = "";
  document.querySelector("#user-phone").value = "";
  document.querySelector("#pick-up-time").value = null;
  document.querySelector("#user-note").value = "";
  updateOrderList();
}

function getDate () {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

// Initialize
function initApp() {
  // User must sign in
  let uid = sessionStorage.getItem("userID");
  if (uid == null) {
    window.location.href = "Access denied";
  } else {
    document.querySelector("#user-name").value =
      sessionStorage.getItem("userName");
  }
  
  document.querySelector("#pick-up-date").value = getDate();

  populateMenu();
  bindDish();
  updateOrderList();
}

window.addEventListener("load", initApp);

export { order_list, Total, menu, clear };
