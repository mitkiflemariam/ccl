document.addEventListener("DOMContentLoaded", function () {
  loadTable();
});

let tb = document.getElementById("table");
const inputElement = document.getElementById("plan");
const due = document.getElementById("due");
let storage = [];
const btn = document.getElementById("add");

tb.addEventListener("click", function (event) {
  // Check if the clicked element is a <tr> element (row)
  if (event.target.closest("tr")) {
    const clickedRow = event.target.closest("tr");
    let storage = JSON.parse(localStorage.getItem("toDos")) || [];

    clickedRow.style.textDecorationLine = "line-through";
    clickedRow.style.textDecorationColor = "red";

    storage.forEach((element) => {
      if (
        clickedRow.cells[0].textContent === element.inputValue &&
        clickedRow.cells[1].textContent === element.created_date &&
        clickedRow.cells[2].textContent === element.dueValue
      ) {
        element.done = true;
      }
    });
    localStorage.setItem("toDos", JSON.stringify(storage));
    console.log(storage);
  }
});
btn.addEventListener("click", function () {
  //   const inputValue = inputElement.value;
  //   const dueValue = due.value;
  //   if (inputValue && dueValue) {
  //     const row = document.createElement("tr");
  //     const plan_data = document.createElement("td");
  //     plan_data.textContent = inputValue;

  //     const due_data = document.createElement("td");
  //     due_data.textContent = dueValue;

  //     const created_date = document.createElement("td");
  //     created_date.textContent = new Date().toLocaleString();

  //     row.appendChild(plan_data);
  //     row.appendChild(created_date);
  //     row.appendChild(due_data);

  //     tb.appendChild(row);

  //     inputElement.value = "";

  //     due.value = "";
  //   }
  addRow();
});

function addRow() {
  const inputValue = inputElement.value;
  const dueValue = due.value;
  if (inputValue && dueValue) {
    created_date = new Date().toLocaleString();
    done = false;
    let storage = JSON.parse(localStorage.getItem("toDos")) || [];

    storage.push({ inputValue, created_date, dueValue, done });

    localStorage.setItem("toDos", JSON.stringify(storage));

    loadRow(inputValue, created_date, dueValue, done);

    inputElement.value = "";

    due.value = "";
  }
}

function loadRow(inputValue, created_date, dueValue, done) {
  let template = `
    <tr>
        <td>${inputValue}</td>
        <td>${created_date}</td>
        <td>${dueValue}</td>
        <td class="td"><input type="button" id="buttonDelete" value="-" onclick="deleteRow(this)" /></td>
    </tr>`;

  let completed = `
    <tr class = "completedTask">
        <td>${inputValue}</td>
        <td>${created_date}</td>
        <td>${dueValue}</td>
        <td><input type="button" class="buttonDelete" value="-" onclick="deleteRow(this)"></td>
    </tr>`;
  if (done) {
    tb.innerHTML += completed;
  } else {
    tb.innerHTML += template;
  }
}

function loadTable() {
  let storage = JSON.parse(localStorage.getItem("toDos")) || [];
  for (let i = 0; i < storage.length; i++) {
    loadRow(
      storage[i].inputValue,
      storage[i].created_date,
      storage[i].dueValue,
      storage[i].done
    );
  }
}

function deleteRow(btn) {
  const row = btn.closest("tr");

  const inputValue = row.cells[0].textContent;
  const created_date = row.cells[1].textContent;
  const dueValue = row.cells[2].textContent;

  row.remove();

  storage = storage.filter(
    (data) =>
      data.inputValue !== inputValue ||
      data.created_date !== created_date ||
      data.dueValue !== dueValue
  );

  localStorage.setItem("toDos", JSON.stringify(storage));
}

const divElement = document.getElementsByClassName("signUp");
const hide = document.getElementsByClassName("hide-form");

function toggleVisibility(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.style.display = element.style.display === "none" ? "flex" : "none";
  }
}

document
  .querySelector(".hide-form")
  .addEventListener("click", () => toggleVisibility(".signUp"));

// document
//   .querySelectorAll(".hide-form")
//   .forEach((button) =>
//     button.addEventListener("click", () => toggleVisibility(".signUp"))
//   );
