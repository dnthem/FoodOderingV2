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
  {
    index: 6,
    id: "TrayTron30",
    name: "Trây Bánh Tráng Trộn $30",
    price: 30,
  },
  {
    index: 7,
    id: "TrayTron40",
    name: "Trây Bánh Tráng Trộn $40",
    price: 40,
  },
  {
    index: 8,
    id: "TrayCuon30",
    name: "Trây Bánh Tráng Cuộn $30",
    price: 30,
  },
  {
    index: 9,
    id: "TrayCuon40",
    name: "Trây Bánh Tráng Cuộn $40",
    price: 40,
  },
  {
    index: 10,
    id: "XoiXaXiu",
    name: "Xôi Xá Xíu Lòng Gà Trứng Cút",
    price: 12,
  },
  {
    index: 11,
    id: "XoiGacCaChep",
    name: "Xôi Gấc Cá Chép",
    price: 6,
  },
  {
    index: 12,
    id: "XoiGacHoaSen",
    name: "Xôi Gấc Hoa Sen",
    price: 12,
  },
  {
    index: 13,
    id: "NemChua",
    name: "Nem Chua Bò (1lb)",
    price: 17,
  },
  {
    index: 14,
    id: "SuaBap",
    name: "Sữa Bắp",
    price: 7,
  }
];

let order_list = []; // Create empty oder_list arr
let Total = 0;

let constraints = {};

/**
 * This functions is called when new constraints are applied and then set new constraints
 * @param {Object} val contain constraints from database
 */
function setConstaints (val) {
  constraints = val;
}

/**
 * Set order date if it is set in contraints
 */
function setDate () {
  const dateField = document.querySelector("#pick-up-date");
  if (constraints["setDate"])
  {
    dateField.value = constraints["date"];
    dateField.setAttribute("disabled", true);
  }
  else {
    dateField.value = getDate();
    dateField.removeAttribute("disabled");
  }
}

/**
 * Calculate total price of order
 * @param {int} unit 
 * @param {int} quantity 
 */
function calculateTotal(unit, quantity) {
  Total += unit * quantity;
}

/**
 * Update order List
 */
function updateOrderList() {
  Total = 0;

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

/**
 * bind remove event for items in order
 */
function bindEvent(td4, index) {
  td4.addEventListener("click", () => {
    deleteItem(index);
  });
}

/**
 * Add items to order functionality
 */
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


/**
 * Populate menu based on contraints
 */
function populateMenu() {
  menu_container.innerHTML= `<h2>Menu</h2>`;
  let indexList = {};
  try {
    if (constraints["indexList"] != null)
      indexList = constraints["indexList"];
  } catch (error) {
    console.warn(error.message); 
  }
  
  for (const index in indexList )
  {
    const newItem = document.createElement("new-dish");
    newItem.data = menu[indexList[index]];
    menu_container.appendChild(newItem);
  }

  // for (let i = 0; i < menu.length; i++) {
  //   const newItem = document.createElement("new-dish");
  //   newItem.data = menu[i];
  //   menu_container.appendChild(newItem);
  // }
}


/**
 * Bind event add items to order
 */
function bindDish() {
  document.querySelectorAll("#menu > new-dish").forEach((dish) => {
    dish.shadowRoot
      .querySelector("article > div > button")
      .addEventListener("click", (event) => {
        addItem(event.target);
      });
  });
}

/**
 * Clear input fields after user submitted order
 */
function clear() {
  order_list = [];
  Total = 0;
  document.querySelector("#user-name").value = "";
  document.querySelector("#user-phone").value = "";
  document.querySelector("#pick-up-time").value = null;
  document.querySelector("#user-note").value = "";
  updateOrderList();
}

/**
 * get the current date
 * @returns current date YYYY-MM-DD
 */
function getDate () {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

// Initialize
function initApp() {
  populateMenu();
  setDate();
  bindDish();
  updateOrderList();
}

window.addEventListener("load", initApp);

export { order_list, Total, menu, clear, setConstaints, initApp};
