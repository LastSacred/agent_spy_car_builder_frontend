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
  img.dataset.cost = car.msrp
  card.appendChild(img)

  const name = document.createElement('h2')
  name.textContent = car.name
  card.appendChild(name)

  const msrp = document.createElement('div')
  msrp.className = 'msrp'
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

  divs.wheels.innerHTML = ""
  car.wheels.forEach(renderWheelOptions)

  divs.interiors.innerHTML = ""
  car.interiors.forEach(renderInteriorOptions)

  divs.accessories.innerHTML = ""
  car.accessories.forEach(renderAccessoryOptions)
}

function renderRadio(feature, featuresName, card, name) {
  const radio = document.createElement('input')
  radio.type = 'radio'
  radio.name = featuresName
  radio.value = feature.id
  radio.dataset.cost = feature.msrp
  card.appendChild(radio)

  if (feature.standard) {
    radio.checked = true
    const selectionContainer = radio.parentElement.parentElement.parentElement.parentElement.querySelector('.feature-header').querySelector('div')
    selectionContainer.textContent = name.textContent
  }

  radio.addEventListener('click', selectFeature)
}

function renderMsrp(feature, card) {
  const msrp = document.createElement('div')
  msrp.className = 'msrp'
  msrp.dataset.cost = feature.msrp
  msrp.textContent = feature.msrp
  card.appendChild(msrp)
}

function renderPowertrainOptions(powertrain) {
  const card = document.createElement('div')
  divs.powertrains.appendChild(card)

  const name = document.createElement('h4')
  name.textContent = powertrain.name
  card.appendChild(name)

  renderRadio(powertrain,'powertrains', card, name)

  renderMsrp(powertrain, card)

  const drivetrain = document.createElement('div')
  drivetrain.textContent = "Drivetrain: " + powertrain.drivetrain
  card.appendChild(drivetrain)

  const engine = document.createElement('div')
  engine.textContent = "Engine: " + powertrain.engine
  card.appendChild(engine)
}

function renderExteriorOptions(exterior) {
  const card = document.createElement('div')
  divs.exteriors.appendChild(card)

  const name = document.createElement('h4')
  name.textContent = exterior.color + " - " + exterior.trim
  card.appendChild(name)

  renderRadio(exterior,'exteriors', card, name)

  renderMsrp(exterior, card)
}

function renderWheelOptions(wheel) {
  const card = document.createElement('div')
  divs.wheels.appendChild(card)

  const name = document.createElement('h4')
  name.textContent = wheel.name
  card.appendChild(name)

  renderRadio(wheel,'wheels', card, name)

  renderMsrp(wheel, card)

  const size = document.createElement('div')
  size.textContent = "Size: " + wheel.size
  card.appendChild(size)

  const finish = document.createElement('div')
  finish.textContent = "Finish: " + wheel.finish
  card.appendChild(finish)
}

function renderInteriorOptions(interior) {
  const card = document.createElement('div')
  divs.interiors.appendChild(card)

  const name = document.createElement('h4')
  name.textContent = interior.color + " - " + interior.upholstery
  card.appendChild(name)

  renderRadio(interior,'interiors', card, name)

  renderMsrp(interior, card)

  const trim = document.createElement('div')
  trim.textContent = interior.trim
  card.appendChild(trim)
}

function renderAccessoryOptions(accessory) {
  const card = document.createElement('div')
  divs.accessories.appendChild(card)

  const name = document.createElement('h4')
  name.textContent = accessory.name
  card.appendChild(name)

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.name = 'accessories'
  checkbox.value = accessory.id
  checkbox.dataset.cost = accessory.msrp
  card.appendChild(checkbox)

  renderMsrp(accessory, card)

  const description = document.createElement('div')
  description.textContent = accessory.description
  card.appendChild(description)
  checkbox.addEventListener('click', selectFeature)
}

function showSelection(event) {
  const selectionContainer = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.feature-header').querySelector('div')
  const name = event.target.parentElement.querySelector('h4').textContent

  selectionContainer.textContent = name
}

function toggleExpandFeature() {
  let expandBtn
  if (event.target.classList.contains('expand-btn')) {
    expandBtn = event.target
  } else {
    expandBtn = event.target.parentElement.parentElement.nextElementSibling
  }

  const options = expandBtn.previousElementSibling

  options.classList.toggle('collapse')

  if (options.classList.contains('collapse')) {
    expandBtn.textContent = 'Expand'
  } else {
    expandBtn.textContent = 'Collapse'
  }
}
