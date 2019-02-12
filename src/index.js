const allMsrp = {
  car: 0,
  powertrain: 0
}

document.addEventListener('DOMContentLoaded', setup)

function setup() {
  getCars().then(renderCars)
}

function selectCar() {
  const carId = event.target.parentElement.dataset.id
  getCar(carId).then(renderCarOptions)
}

function selectFeature() {
  const msrpNum = parseInt(event.target.parentElement.querySelector('.msrp').dataset.cost)
  const options = event.target.parentElement.parentElement
  const feature = options.parentElement.id
  const msrpValues = options.querySelectorAll('.msrp')

  allMsrp[feature] = msrpNum
  updateMsrp()

  msrpValues.forEach((msrpValue) => {
    msrpValue.textContent = msrpValue.dataset.cost - allMsrp[feature]
  })
}
