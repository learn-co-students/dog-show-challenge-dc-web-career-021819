document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/dogs")
    .then(e => e.json())
    .then(dogs => {
      dogs.forEach(dog => {
        new Dog(dog.id, dog.name, dog.breed, dog.sex);
      });
    });
});

class Dog {
  constructor(id, name, breed, sex) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
    this.makeEntry();
  }
  makeEntry() {
    const table = document.getElementById("table-body");
    this.row = document.createElement("tr");
    this.row.id = `dog-${this.id}`;
    this.row.innerHTML = `<td>${this.name}</td> <td>${this.breed}</td> <td>${this.sex}</td><td></td>`;
    const edit = document.createElement("button");
    edit.innerHTML = "Edit";
    edit.addEventListener(
      "click",
      (() => {
        this.editDog();
      }).bind(this)
    );
    this.row.children[3].appendChild(edit);
    table.appendChild(this.row);
  }

  updateEntry() {
    this.row.children[0].innerHTML = this.name;
    this.row.children[1].innerHTML = this.breed;
    this.row.children[2].innerHTML = this.sex;

    fetch(`http://localhost:3000/dogs/${this.id}`, {
      method: "PATCH",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ name: this.name, breed: this.breed, sex: this.sex })
    }).then(e => console.log("patched", e));
  }
  editDog() {
    console.log("Reached");
    const form = document.getElementById("dog-form");
    form.name.value = this.name;
    form.breed.value = this.breed;
    form.sex.value = this.sex;
    form.onsubmit = e => {
      console.log("Submit");
      e.preventDefault();
      this.name = form.name.value;
      this.breed = form.breed.value;
      this.sex = form.sex.value;
      this.updateEntry();
    };
  }
}
