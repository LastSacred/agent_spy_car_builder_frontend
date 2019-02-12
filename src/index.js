document.addEventListener('DOMContentLoaded', setup)

function setup() {
  getCars().then(renderCars)
}

function selectCar() {
  const carId = event.target.parentElement.dataset.id

  updateMsrp(event)

  getCar(carId).then(renderCarOptions)
}

function selectFeature() {
  updateMsrp(event)
  showSelection(event)
}
