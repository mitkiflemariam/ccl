let ulElement = document.getElementById("list");
console.log(ulElement);

let liElement = document.createElement("li");
liElement.textContent = "third list";
console.log(liElement);

ulElement.appendChild(liElement);
