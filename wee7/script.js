let item_name = document.getElementById("item-name");
let quantity = document.getElementById("quantity");
let price = document.getElementById("price");
let tabl = document.getElementById("items-table");

let items = [];

// Function to calculate total quantity
function total_quantity(items) {
  return items.length > 0
    ? items.map((item) => item.quantity).reduce((x, y) => x + y, 0)
    : 0;
}

// Function to update total quantity in UI
function updateTotalQuantity() {
  document.getElementById("quty").innerText = total_quantity(items);
}

document.getElementById("add_btn").addEventListener("click", function () {
  item_name_val = item_name.value;
  quantity_val = quantity.value;
  price_val = price.value;
  toal_price = Number(quantity_val) * parseFloat(price_val);
  let row = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.innerText = item_name_val;
  let td2 = document.createElement("td");
  td2.innerText = quantity_val;
  let td3 = document.createElement("td");
  td3.innerText = price_val;

  let td4 = document.createElement("td");
  td4.innerText = toal_price;

  let del = document.createElement("button");
  del.innerText = "del";
  //   del.setAttribute("onclick", deleteRow(this));
  let td5 = document.createElement("td");
  td5.innerHTML =
    '<input type="button" class="buttonDelete" value="Delete item" onclick="deleteRow(this)">';

  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  row.appendChild(td5);

  tabl.appendChild(row);

  items.push({
    item_name: item_name_val,
    quantity: Number(quantity_val),
    price: parseFloat(price_val),
    toal_price: toal_price,
  });
  //   total_quantity(items);
  updateTotalQuantity();
  // Clear input fields
  item_name.value = "";
  quantity.value = "";
  price.value = "";
});

function deleteRow(btn) {
  const row = btn.closest("tr");

  const inpuitem_name = row.cells[0].textContent;
  const quantity = row.cells[1].textContent;
  const price = row.cells[2].textContent;
  const toal_price = row.cells[3].textContent;

  row.remove();

  items = items.filter(
    (data) =>
      data.inpuitem_name !== inpuitem_name ||
      data.quantity !== quantity ||
      data.price !== price ||
      data.toal_price !== toal_price
  );
  //   total_quantity(items);
  updateTotalQuantity();
}
updateTotalQuantity();
