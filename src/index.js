document.addEventListener('DOMContentLoaded', setup)

function setup() {
  getCars().then(renderCars)
}

function selectCar() {
  const carId = event.target.parentElement.dataset.id

  expandHandler()

  allMsrp.car = parseInt(event.target.dataset.cost)
  updateMsrp()

  getCar(carId).then(renderCarOptions)

  document.querySelector('#feature-container').classList.remove('collapse')

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
