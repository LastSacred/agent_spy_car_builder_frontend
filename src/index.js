const loginForm = document.querySelector('form.subscription')
const carSelect = document.querySelector('.subscription-area')
const usernameDisplay = document.querySelector('#username')

let username

document.addEventListener('DOMContentLoaded', setup)

function setup() {
  loginHandler()
  getCars().then(renderCars)
}

function loginHandler() {
  loginForm.addEventListener('submit', login)

  function login() {
    event.preventDefault()

    username = loginForm.username.value

    loginForm.classList.add('collapse')
    carSelect.classList.remove('collapse')

    usernameDisplay.textContent = "Welcome " + username

    event.target.reset()
  }
}

function selectCar() {
  const carId = event.target.parentElement.dataset.id

  expandHandler()

  allMsrp.car = parseInt(event.target.dataset.cost)
  updateMsrp()

  getCar(carId).then(renderCarOptions)

  document.querySelector('#feature-container').classList.remove('collapse')

  hideOtherCars(carId)

  progressCompleted('car')
}

function expandHandler() {
  const expandButtons = document.querySelectorAll('.expand-btn')

  expandButtons.forEach((button) => {
    button.addEventListener('click', toggleExpandFeature)
  })
}

function selectFeature() {
  const featureName = event.target.parentElement.parentElement.id

  showSelection(event)

  if (featureName !== 'accessories') {
    toggleExpandFeature()
    allMsrp[featureName] = parseInt(event.target.dataset.cost)
  } else {
    const checkboxes = document.querySelector('#accessories').querySelectorAll('input')

    let costs = []

    checkboxes.forEach((checkbox) => {
      costs.push(getCheckboxCost(checkbox))
    })

    allMsrp[featureName] = costs.reduce((a, b) =>{
      return a + b
    })
  }
  updateMsrp()
}
