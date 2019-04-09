function getAllDogs(){
  let tbody = document.getElementById('table-body');
  tbody.innerHTML = '';
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => dogs.forEach(renderDog))
}

function renderDog(dog){
  // console.log(dog)
  let tbody = document.getElementById('table-body');
  let tr = tbody.appendChild(document.createElement('tr'));
  let nameTd = tr.appendChild(document.createElement('td'));
  nameTd.innerText = dog.name;
  let breedTd = tr.appendChild(document.createElement('td'));
  breedTd.innerText = dog.breed;
  let sexTd = tr.appendChild(document.createElement('td'));
  sexTd.innerText = dog.sex;
  let editTd = tr.appendChild(document.createElement('td'));
  editTd.style.textAlign = "center";
  let editBtn = editTd.appendChild(document.createElement('button'));
  editBtn.innerText = 'Edit'
  editBtn.addEventListener('click', () => {
    editDog(dog)
  })
}

function editDog(dog){
  // console.log(dog)
  const editH4 = document.querySelector('div h4')
  const editForm = document.getElementById('dog-form')
  editH4.style.display = 'block'
  editForm.style.display = 'block'
  const editFields = editForm.querySelectorAll('input');
  editFields[0].value = dog.name;
  editFields[1].value = dog.breed;
  editFields[2].value = dog.sex;
  editFields[3].id = `dog-${dog.id}`;
}

function patchDog(e){
  e.preventDefault();
  // console.log(e.currentTarget.querySelectorAll('input')[3].id);
  const id = document.querySelectorAll('input')[3].id.split("-")[1]
  // console.log(id)
  const editH4 = document.querySelector('div h4')
  const editForm = document.getElementById('dog-form')
  const editFields = editForm.querySelectorAll('input');
  let nameE = editFields[0].value;
  let breedE = editFields[1].value;
  let sexE = editFields[2].value;
  const obj = {name: nameE, breed: breedE, sex: sexE}
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  }).then(getAllDogs)
  // .then(res => res.json())
  // .then(dogData => updateDog(dogData))
  editH4.style.display = 'none'
  editForm.style.display = 'none'
}
