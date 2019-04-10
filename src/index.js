const URL = `http://localhost:3000/dogs/`
function getForm() {
  return form = document.querySelector(`#dog-form`)
}


const getDogs= ()=> {
  fetch(URL)
  .then(res => res.json())
  .then(arrayDogObjs => {arrayDogObjs.forEach(makeDogRow)
  })
}

const makeDogRow= (dog)=> {
  document.querySelector('#table-body').innerHTML += `
    <tr id=${dog.id}>
      <td class=padding>${dog.name}</td>
      <td class=padding>${dog.breed}</td>
      <td class=padding>${dog.sex}</td>
      <td>
        <button class=button>Edit Dog</button>
      </td>
    </tr>`
}

const addEditListener= ()=> {
  document.addEventListener('click', (event)=> {
    if (event.target.className === 'button') {
      const row = event.target.parentElement.parentElement
      fillFormData(row)
    }
  })
}

const fillFormData= (row)=> {
  getForm()
  form.elements.name.value = row.children[0].innerText
  form.elements.breed.value = row.children[1].innerText
  form.elements.sex.value = row.children[2].innerText
  form.id = row.id
}

const getFormData= ()=> {
  getForm()
  return {
    name: form.elements.name.value,
    breed:form.elements.breed.value,
    sex: form.elements.sex.value,
    id: form.id
  }
}

const addSubmitListener= ()=> {
  getForm().addEventListener('submit', (event)=> {
    let formName = event.target.children.name.value
    let formBreed = event.target.children.breed.value
    let formSex = event.target.children.sex.value

    let objectRow = {name:formName, breed:formBreed, sex:formSex}

    let num = event.target.id
    updateDogs(objectRow, num)
  })
}

const updateDogs= (row, id)=> {
  const patch = {
    method: `PATCH`,
    headers: {"Content-Type": `application/json`, Accept: `application/json`},
    body: JSON.stringify(row)
  }
  fetch(URL+id, patch)
  .then(res => res.json())
  .then(res => {
    console.log("did something", res)
  })
}

const init= ()=> {
  getDogs()
  addEditListener()
  addSubmitListener()
}

document.addEventListener('DOMContentLoaded', init)
