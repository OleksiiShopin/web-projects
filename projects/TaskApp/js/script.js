const form = document.getElementById('task-form')
const nameInput = document.getElementById('task-name');
const descriptionInput = document.getElementById('task-description');
const container = document.querySelector('.tasks-container');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  console.log(nameValue, descriptionValue);
  renderTask(nameValue, descriptionValue);
})


function renderTask(name, description) {
  const cardRoot = document.createElement('div');
  const cardTitle = document.createElement('h3');
  const cardDescription = document.createElement('p');
  const creationDateElement = document.createElement('span');

  cardRoot.classList.add('task');
  cardTitle.classList.add('task__title');
  cardDescription.classList.add('task__description');
  creationDateElement.classList.add('task__date');
  
  const currentDate = new Date();
  const dateTimeString = currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();

  cardTitle.innerText = name;
  cardDescription.innerText = description;
  creationDateElement.innerText = dateTimeString;

  cardRoot.append(cardTitle, cardDescription, creationDateElement);

  console.log(container)

  container.append(cardRoot);
}