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
  card.classList.add("col-lg-6", "align-items-center", "pl-20", "pr-20");
  card.dataset.id = car.id
  divs.car.appendChild(card)

  const name = document.createElement('h4')
  name.classList.add("title");
  name.textContent = car.name
  card.appendChild(name)

  const img = document.createElement('img')
  img.src = car.image
  img.classList.add("car-image");
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

  // Button //
  const link = document.createElement('a')
  link.classList.add("primary-btn", "hover", "d-inline-flex", "align-items-center");
  link.id = ("car-button");
  link.dataset.cost = car.msrp
  card.appendChild(link)

  const text = document.createElement('span')
  text.classList.add("mr-10");
  text.textContent = "Start Build"
  link.appendChild(text)

  const arrow = document.createElement('span')
  arrow.classList.add("lnr", "lnr-arrow-right");
  link.appendChild(arrow)

  link.addEventListener('click', selectCar)
  // End Button //

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
  card.insertBefore(radio, card.firstChild)

  if (first) {
    radio.checked = true

    const selectionContainer = radio.closest('.section-top-border').querySelector('h5')
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

  const row = document.createElement('div')
  row.classList.add("row");
  divs.powertrains.appendChild(row)

  const cardRadio = document.createElement('div')
  cardRadio.classList.add("col-lg-1", "align-items-right", "pt-20");
  row.appendChild(cardRadio)

  const card = document.createElement('div')
  card.classList.add("col-lg-4", "align-items-center");
  row.appendChild(card)

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

  renderRadio(powertrain, featureName, cardRadio, name, !index)
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
  const selectionContainer = event.target.closest('.section-top-border').querySelector('h5')
  const name = event.target.closest(".row").querySelector('h4').textContent

  if (event.target.type !== 'checkbox') {
    selectionContainer.textContent = name
  } else {

    const accessoryDivs = event.target.closest('.options').childNodes

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
    expandBtn = event.target.closest(".section-top-border").querySelector(".expand-btn")
  }
  const options = expandBtn.closest(".section-top-border").querySelector('.options')


  options.classList.toggle('collapse')

  if (options.classList.contains('collapse')) {
    expandBtn.textContent = 'Expand'

    progressCompleted(options.id)
  } else {
    expandBtn.textContent = 'Submit'
  }
}

function hideOtherCars(carId) {
  divs.car.childNodes.forEach((car) => {
    if (car.nodeName !== "#comment" && car.dataset.id !== carId) {
      car.classList.add('collapse')
    } else if (car.nodeName !== "#comment" && car.dataset.id === carId) {
      car.querySelector('#car-button').classList.add('invisible')
    }
  })
}
