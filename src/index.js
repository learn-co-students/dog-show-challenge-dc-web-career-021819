document.addEventListener('DOMContentLoaded', () => {

  const tableBody = document.getElementById("table-body")
  let dogList = ""

  // Form fields
  const nameField = document.getElementById("name")
  const breedField = document.getElementById("breed")
  const sexField = document.getElementById("sex")

  let currentDog

  renderDogs()
  // Get request to populate data
  function renderDogs(){
    dogList = ""
    fetch("http://localhost:3000/dogs")
    .then(event => event.json())
    .then(event => {event.forEach(dog => {
        dogList += `<tr><td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td> <td>
        <button class="button" id=${dog.id}>Edit</button></td></tr>`
      })
      tableBody.innerHTML = dogList
    })
}
  // Add click event lister for edit button
  document.addEventListener("click", event => {
    if(event.target.className === "button"){
      currentDog = event.target.id
      nameField.value = event.target.parentElement.parentElement.querySelectorAll("td")[0].innerText
      breedField.value = event.target.parentElement.parentElement.querySelectorAll("td")[1].innerText
      sexField.value = event.target.parentElement.parentElement.querySelectorAll("td")[2].innerText
    }
    if(event.target.id === "submit"){
      event.preventDefault()
      if (currentDog != undefined){
        //debugger
        fetch(`http://localhost:3000/dogs/${currentDog}`, {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name: nameField.value, breed: breedField.value, sex: sexField.valued})
        })
        .then(renderDogs)
      }
    }
  })
})
