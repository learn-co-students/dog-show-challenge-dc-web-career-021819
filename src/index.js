document.addEventListener("DOMContentLoaded", () => {
  getAllDogs();

  let form = document.querySelector("form");
  form.addEventListener("submit", submitHandler);
});

function getAllDogs() {
  fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(dogArray => {
      dogArray.forEach(renderDog);
    });
}

function renderDog(dog) {
  let body = document.getElementById("table-body");
  let dogRow = document.createElement("tr");
  let nameTd = document.createElement("td");
  let breedTd = document.createElement("td");
  let sexTd = document.createElement("td");
  let buttonTd = document.createElement("td");
  let dogEditButton = document.createElement("button");

  dogRow.id = dog.id;
  nameTd.innerText = dog.name;
  breedTd.innerText = dog.breed;
  sexTd.innerText = dog.sex;
  dogEditButton.innerText = "Edit Dog";
  dogEditButton.addEventListener("click", editClickHandler);
  buttonTd.appendChild(dogEditButton);

  dogRow.appendChild(nameTd);
  dogRow.appendChild(breedTd);
  dogRow.appendChild(sexTd);
  dogRow.appendChild(buttonTd);
  body.appendChild(dogRow);
}

function editClickHandler() {
  // event.preventDefault();
  let currentRow = event.currentTarget.parentNode.parentNode;
  document.querySelectorAll("input")[0].value =
    currentRow.children[0].innerText;
  document.querySelectorAll("input")[1].value =
    currentRow.children[1].innerText;
  document.querySelectorAll("input")[2].value =
    currentRow.children[2].innerText;
  let setForm = document.querySelector("form");
  setForm.id = currentRow.id;
}

function submitHandler() {
  // event.preventDefault();
  let editFields = document.querySelectorAll("input");

  let name = editFields[0].value;
  let breed = editFields[1].value;
  let sex = editFields[2].value;

  patchDog(name, breed, sex);
}

function patchDog(name, breed, sex) {
  let formId = document.querySelector("form").id;
  let updatedDog = { name: name, breed: breed, sex: sex };
  fetch(`http://localhost:3000/dogs/${formId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedDog)
  })
    .then(resp => resp.json())
    .then(renderDog);
}
// <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
