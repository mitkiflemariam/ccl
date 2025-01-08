let tb = document.getElementById("table");
const inputElement = document.getElementById("plan");
const due = document.getElementById("due");

const btn = document.getElementById("add");
btn.addEventListener("click", function () {
  const inputValue = inputElement.value;
  const dueValue = due.value;
  if (inputValue && dueValue) {
    const row = document.createElement("tr");
    const plan_data = document.createElement("td");
    plan_data.textContent = inputValue;

    const due_data = document.createElement("td");
    due_data.textContent = dueValue;

    const created_date = document.createElement("td");
    created_date.textContent = new Date().toLocaleString();

    row.appendChild(plan_data);
    row.appendChild(created_date);
    row.appendChild(due_data);

    tb.appendChild(row);

    inputElement.value = "";

    due.value = "";
  }
});
