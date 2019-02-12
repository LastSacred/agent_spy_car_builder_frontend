const divs = {
  car: document.querySelector('#car'),
  powertrains: document.querySelector('#powertrain'),
  exteriors: document.querySelector('#exterior'),
  wheels: document.querySelector('#wheels'),
  interiors: document.querySelector('#interior'),
  accessories: document.querySelector('#accessories'),
}

function renderCars(cars) {
  cars.forEach(renderCar)
}

function renderCar(car) {
  const card = document.createElement('div')
  card.dataset.id = car.id
  divs.car.appendChild(card)

  const img = document.createElement('img')
  img.src = car.image
  card.appendChild(img)

  const name = document.createElement('h2')
  name.textContent = car.name
  card.appendChild(name)

  const msrp = document.createElement('div')
  msrp.className = 'msrp'
  msrp.dataset.cost = car.msrp
  msrp.textContent = "Base MSRP: " + car.msrp
  card.appendChild(msrp)

  const description = document.createElement('div')
  description.textContent = car.description
  card.appendChild(description)

  img.addEventListener('click', selectCar)
}

function renderCarOptions(car) {
  divs.powertrains.innerHTML = ""
  car.powertrains.forEach(renderPowertrainOptions)

  divs.exteriors.innerHTML = ""
  car.exteriors.forEach(renderExteriorOptions)
}

function renderPowertrainOptions(powertrain) {
    const card = document.createElement('div')
    divs.powertrains.appendChild(card)

    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'powertrains'
    radio.value = powertrain.id
    if (powertrain.standard) {
      radio.checked = true
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

function renderExteriorOptions(exterior) {
    const card = document.createElement('div')
    divs.exteriors.appendChild(card)

    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'exteriors'
    radio.value = exterior.id
    if (exterior.standard) {

    }
    card.appendChild(radio)

    const name = document.createElement('h4')
    name.textContent = exterior.color + " - " + exterior.trim
    card.appendChild(name)

    const msrp = document.createElement('div')
    msrp.className = 'msrp'
    msrp.dataset.cost = exterior.msrp
    msrp.textContent = exterior.msrp
    card.appendChild(msrp)

    radio.addEventListener('click', selectFeature)
}
