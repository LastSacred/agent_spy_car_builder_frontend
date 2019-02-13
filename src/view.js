const divs = {
  car: document.querySelector('#car'),
  // carButton: document.querySelector('#start-build'),
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

  const name = document.createElement('h4')
  name.classList.add("title");
  name.textContent = car.name

  card.appendChild(name)

  const img = document.createElement('img')
  img.src = car.image
  img.dataset.cost = car.msrp
  card.appendChild(img)

  const msrp = document.createElement('p')
  msrp.className = 'msrp'
  msrp.textContent = "Base MSRP: $ " + car.msrp + ".00"
  card.appendChild(msrp)

  const description = document.createElement('p')
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

  updateMsrp()
}

function renderRadio(feature, featureName, card, name, first) {
  const radio = document.createElement('input')
  radio.type = 'radio'
  radio.name = featureName
  radio.value = feature.id
  radio.dataset.cost = feature.msrp
  card.appendChild(radio)

  if (first) {
    radio.checked = true
    const selectionContainer = radio.parentElement.parentElement.parentElement.parentElement.querySelector('.feature-header').querySelector('div').querySelector('h5')
    selectionContainer.textContent = name.textContent

    allMsrp[featureName] = feature.msrp
  }

  radio.addEventListener('click', selectFeature)
}

function renderMsrp(feature, card) {
  const msrp = document.createElement('div')
  msrp.className = 'msrp'
  msrp.dataset.cost = feature.msrp
  msrp.textContent = `$ ${feature.msrp}.00`
  card.appendChild(msrp)
}

function renderPowertrainOptions(powertrain, index) {
  const featureName = 'powertrain'

  const card = document.createElement('div')
  divs.powertrains.appendChild(card)

  const name = document.createElement('h4')
  name.textContent = `The ${powertrain.name} Package`
  card.appendChild(name)

  const drivetrain = document.createElement('li')
  drivetrain.textContent = "Drivetrain: " + powertrain.drivetrain
  card.appendChild(drivetrain)

  const engine = document.createElement('li')
  engine.textContent = "Engine: " + powertrain.engine
  card.appendChild(engine)

  renderMsrp(powertrain, card)

  renderRadio(powertrain, featureName, card, name, !index)
}

function renderExteriorOptions(exterior, index) {
  const featureName = 'exterior'

  const card = document.createElement('div')
  divs.exteriors.appendChild(card)

  // const name = document.createElement('h4')
  // name.textContent = exterior.color + " - " + exterior.trim
  // card.appendChild(name)

  const name = document.createElement('h4')
  name.textContent = exterior.color
  card.appendChild(name)

  const trim = document.createElement('h5')
  trim.textContent = "Trim Properties: " + exterior.trim
  card.appendChild(trim)

  renderMsrp(exterior, card)

  renderRadio(exterior, featureName, card, name, !index)
}

function renderWheelOptions(wheel, index) {
  const featureName = 'wheels'

  const card = document.createElement('div')
  divs.wheels.appendChild(card)

  const name = document.createElement('h4')
  name.textContent = wheel.name
  card.appendChild(name)

  const size = document.createElement('div')
  size.textContent = "Size: " + wheel.size
  card.appendChild(size)

  const finish = document.createElement('div')
  finish.textContent = "Finish: " + wheel.finish
  card.appendChild(finish)

  renderMsrp(wheel, card)

  renderRadio(wheel, featureName, card, name, !index)
}

function renderInteriorOptions(interior, index) {
  const featureName = 'interior'
  const card = document.createElement('div')
  divs.interiors.appendChild(card)

  const name = document.createElement('h4')
  name.textContent = interior.color + " - " + interior.upholstery
  card.appendChild(name)

  const trim = document.createElement('li')
  trim.textContent = interior.trim
  card.appendChild(trim)

  renderMsrp(interior, card)

  renderRadio(interior, featureName, card, name, !index)
}

function renderAccessoryOptions(accessory) {
  const featureName = 'accessories'

  const card = document.createElement('div')
  divs.accessories.appendChild(card)

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.name = featureName
  checkbox.value = accessory.id
  checkbox.dataset.cost = accessory.msrp
  card.appendChild(checkbox)

  const name = document.createElement('h4')
  name.textContent = accessory.name
  card.appendChild(name)

  const description = document.createElement('p')
  description.textContent = accessory.description
  card.appendChild(description)
  checkbox.addEventListener('click', selectFeature)

  renderMsrp(accessory, card)
}

function showSelection(event) {
  const selectionContainer = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.feature-header').querySelector('div').querySelector('h5')
  const name = event.target.parentElement.querySelector('h4').textContent

  if (event.target.type !== 'checkbox') {
    selectionContainer.textContent = name
  } else {
    const accessoryDivs = event.target.parentElement.parentElement.childNodes

    selectionContainer.innerHTML = ""

    accessoryDivs.forEach((accessoryDiv) => {
      if (accessoryDiv.querySelector('input').checked) {
        const accessoryShow = document.createElement('div')
        accessoryShow.textContent = accessoryDiv.querySelector('h4').textContent
        selectionContainer.appendChild(accessoryShow)
      }
    })
  }

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
    
    progressCompleted(options.id)
  } else {
    expandBtn.textContent = 'Submit'
  }
}
