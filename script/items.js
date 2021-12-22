class NewDish extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    const container = document.createElement("article");

    style.innerHTML = `
        #order-list {
            display: flex;
            flex-direction: column;
            margin-right: 0;
          }
          
          table {
            margin-bottom: 21px;
            width: 100%;
            border: none;
          }
          
          table, th, td {
            border-collapse: collapse;
          }
          
          tr:not(:first-child):not(:last-child) {
            border-bottom: 1px solid #ddd;
          }
          
          th, td {
            padding: 4px 6px;
            text-align: left;
          }
          
          th {
            background: #ffbe76;
            color: #fff;
          }
          
          .menu-item {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
          }
          
          .menu-item:last-child {
            border-bottom: none;
          }
          
          .menu-item h4, .menu-item p {
            margin: 8px;
          }
          
          .menu-item .price {
            margin-left: auto;
          }
          
          .qty {
            margin-right: 8px;
            padding: 2px 4px;
            width: 40px;
          }
          
          .add-btn {
            padding: 6px 10px;
            background: #6ab04c;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          
          .del-btn {
            display: block;
            text-align: center;
          }
          
          .del-btn:hover { opacity: .75 }
          
          .del-btn .fa {
            color: #eb4d4b; 
          }
          
          #export {
            margin-top: auto;
            padding: 3px 5px;
            background: #eee;
            border: 1px solid #ddd;
            align-self: flex-end;
            font-size: 12px;
            cursor: pointer;
          }
        `;

    container.innerHTML = `
      <div class="menu-item">
              <p class="food-name"></p>
              <p class="price"></p>
              <input class="qty" type="number" name="qty" value="1" min="1" max="100">
              <button class="add-btn" name="0">ADD</button>
      </div>
      `;

      this.shadowRoot.append(style, container);
  }

  set data(data) {
    if (data == null) {
      console.error("error: No data found");
      return;
    }
    this.shadowRoot.querySelector("article").innerHTML = `
    <div class="menu-item">
      <p class="food-name"></p>
      <p class="price"></p>
      <input class="qty" type="number" name="qty" value="1" min="1" max="100">
      <button class="add-btn" name="0">ADD</button>
    </div>
    `
    let name = this.shadowRoot.querySelector(".food-name");
    let price = this.shadowRoot.querySelector(".price");
    let button = this.shadowRoot.querySelector("button");

    name.innerText = data["name"];
    price.innerText = "$" + data["price"];
    button.name = data["index"];
  }
}


customElements.define("new-dish", NewDish);