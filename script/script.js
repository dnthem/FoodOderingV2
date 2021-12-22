// Declare variables
const menu_container = document.getElementById("menu");
const order_tbl = document.getElementById("order-tbl");
const menu = [
  {
    index: 0,
    name: "Bánh Tráng Trộn",
    price: 10,
  },
  {
    index: 1,
    name: "Bánh Tráng Cuốn",
    price: 10,
  },
  {
    index: 2,
    name: "Bánh Tráng Sate",
    price: 7,
  },
  {
      index: 3,
      name: "Trứng Nướng",
      price: 7
  }
];
var order_list = []; // Create empty oder_list arr

function updateOrderList() {
    order_tbl.innerHTML = `
    <tr>
        <th>#</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Action</th>
    </tr>
    `
  if (order_list.length > 0) {
   
    order_list.forEach((item, index) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement('td');
      td1.innerText = index + 1;
      td2.innerText = menu[item.id].name;
      td3.innerText = item.quantity;
      td4.innerHTML = `<i style="cursor: pointer">remove</i>`;
      bindEvent(td4,index,deleteItem);
     
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      order_tbl.appendChild(tr);

    });
  } else {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td style="text-align: center">Your order list is empty</td>`;
    order_tbl.appendChild(tr);
  }
}

function bindEvent(td4,index,deleteItem) {
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
// Initialize
function initApp() {
  populateMenu();
  bindDish();
  updateOrderList();
}

window.addEventListener("load", initApp);
