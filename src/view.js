const carsContainer = document.querySelector('#cars-container')
const powertrainOptions = document.querySelector('#powertrain-options')
const msrpField = document.querySelector('#total-msrp')

function renderCars(cars) {
  cars.forEach(renderCar)
}

function renderCar(car) {
  const card = document.createElement('div')
  card.dataset.id = car.id
  carsContainer.appendChild(card)

  const img = document.createElement('img')
  img.src = car.image
  card.appendChild(img)

  const name = document.createElement('h2')
  name.textContent = car.name
  card.appendChild(name)

  const msrp = document.createElement('div')
  msrp.textContent = 'Base MSRP: ' + car.msrp
  card.appendChild(msrp)

  const description = document.createElement('div')
  description.textContent = car.description
  card.appendChild(description)

  img.addEventListener('click', selectCar)
}

function renderCarOptions(car) {
  console.log(car)

  allMsrp['car'] = car.msrp
  updateMsrp()

  powertrainOptions.innerHTML = ""
  car.powertrains.forEach(renderPowertrainOptions)
}

function renderPowertrainOptions(powertrain) {
    const card = document.createElement('div')
    powertrainOptions.appendChild(card)

    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'powertrain'
    radio.value = powertrain.id
    if (powertrain.standard) {

    }
    card.appendChild(radio)

    const name = document.createElement('h4')
    name.textContent = powertrain.name
    card.appendChild(name)

    const msrp = document.createElement('div')
    msrp.className = 'msrp'
    msrp.dataset.cost = powertrain.msrp
    msrp.textContent = powertrain.msrp
    card.appendChild(msrp)

    const drivetrain = document.createElement('div')
    drivetrain.textContent = "Drivetrain: " + powertrain.drivetrain
    card.appendChild(drivetrain)

    const engine = document.createElement('div')
    engine.textContent = "Engine: " + powertrain.engine
    card.appendChild(engine)

    radio.addEventListener('click', selectFeature)
}

function updateMsrp() {
  let totalMsrp = 0

  for(let msrp in allMsrp) {
    totalMsrp += allMsrp[msrp]
  }

  msrpField.textContent = totalMsrp
}
