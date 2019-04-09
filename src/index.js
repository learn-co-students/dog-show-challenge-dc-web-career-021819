document.addEventListener('DOMContentLoaded', () => {
  const editH4 = document.querySelector('div h4')
  editH4.style.display = 'none';
  const editForm = document.getElementById('dog-form')
  editForm.style.display = 'none';

  getAllDogs();

  editForm.addEventListener('submit', (e) => {
    patchDog(e);
  })
})
