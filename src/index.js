document.addEventListener('DOMContentLoaded', () => {

  function getDogs(){
    let table = document.querySelector('#table-body')
    table.innerHTML = ''
    fetch("http://localhost:3000/dogs").then(resp => resp.json())
    .then(function(dogs){
      dogs.forEach(function(dog){
        let newRow = document.createElement('tr')
          newRow.innerHTML = `<td headers="name">${dog.name}</td>
          <td headers="breed">${dog.breed}</td>
          <td headers="sex">${dog.sex}</td>`
          newRow.id = dog.id
          let button = document.createElement('button')
          button.innerHTML = "Edit Dog"
          button.addEventListener('click', editDog)
          newRow.appendChild(button)
          table.appendChild(newRow)
      })
    }
  )
}

function editDog(){
  let dogRow = this.parentElement
  let dogForm = document.querySelector("#dog-form")
  dogForm.id = dogRow.id
  let btn = dogForm.lastElementChild
  btn.addEventListener('click', updateDog)
  for (i=0; i<3; i++) {
    dogForm[i].value = dogRow.children[i].innerText
  }
}

function updateDog(event){
  event.preventDefault()
  let form = event.target.parentElement
  let dogObj = {}
  dogObj.name = form.name.value
  dogObj.breed = form.breed.value
  dogObj.sex = form.sex.value
  fetch(`http://localhost:3000/dogs/${form.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(dogObj)
  }).then(resp => resp.json())
  .then(function(){
    form.reset()
    getDogs()
  })
}

  getDogs()
  }
)
