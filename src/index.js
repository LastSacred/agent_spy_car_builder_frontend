document.addEventListener('DOMContentLoaded', setup)

function setup() {
  getCars().then(renderCars)
}

function selectCar() {
  const carId = event.target.parentElement.dataset.id

  expandHandler()

  updateMsrp(event)

  getCar(carId).then(renderCarOptions)
}

function expandHandler() {
  const expandButtons = document.querySelectorAll('.expand-btn')

  expandButtons.forEach((button) => {
    button.addEventListener('click', toggleExpandFeature)
  })
}

function selectFeature() {
  updateMsrp(event)

  showSelection(event)

  toggleExpandFeature()
}
