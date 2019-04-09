document.addEventListener('DOMContentLoaded', () => {
  let table = document.getElementById("table-body");
  let form = document.getElementById("dog-form");

  form.addEventListener("submit", formSubmitHandler);
  renderTable();
})

function formSubmitHandler(event){
  event.preventDefault();
  form = event.target;
  let inputs = form.querySelectorAll("input");
  dog = Dog.dogs.find(dog => dog.id === parseInt(form.dataset.id));

  dog.update(inputs[0].value, inputs[1].value, inputs[2].value);

  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";

  fetch(`http://localhost:3000/dogs/${dog.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accepts: "json"
    },
    body: JSON.stringify(dog)
  })
  .then(res => res.json())
}

function renderTable(){
  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      let dog = new Dog(item.id, item.name, item.breed, item.sex);
      dog.createRow();
    })
  })
}

function editButtonHandler(event){
  let form = document.getElementById("dog-form");
  let row = event.target.parentNode.parentNode;
  rowItems = row.querySelectorAll("td");
  let inputs = form.querySelectorAll("input");
  inputs[0].value = rowItems[0].innerText;
  inputs[1].value = rowItems[1].innerText;
  inputs[2].value = rowItems[2].innerText;
  form.dataset.id = row.id.match(/\d+/g).map(Number);
}

class Dog{
  static dogs = [];

  constructor(id, name, breed, sex){
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
    Dog.dogs.push(this);
  }

  createRow(){
    let table = document.getElementById("table-body");
    let row = document.createElement("tr");
    row.innerHTML = `<td>${this.name}</td><td>${this.breed}</td><td>${this.sex}</td>`;
    row.id = `doggo-row-${this.id}`;
    let editColumn = document.createElement("td");
    let editButton = document.createElement("button");
    editButton.innerText = "Edit Dog";
    editButton.addEventListener("click", editButtonHandler);
    editColumn.appendChild(editButton);
    row.appendChild(editColumn);
    table.appendChild(row);
  }

  update(name, breed, sex){
    this.name = name;
    this.breed = breed;
    this.sex = sex;

    let row = document.getElementById(`doggo-row-${this.id}`);
    let columns = Array.from(row.querySelectorAll("td"));
    columns[0].innerText = this.name;
    columns[1].innerText = this.breed;
    columns[2].innerText = this.sex;
  }
}
