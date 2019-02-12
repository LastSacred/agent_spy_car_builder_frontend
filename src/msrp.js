const msrpField = document.querySelector('#total-msrp')

const allMsrp = {
  car: 0,
  powertrain: 0,
  exterior: 0,
  wheels: 0,
  interior: 0,
  accessories: 0
}

function getCheckboxCost(checkbox) {
  if (checkbox.checked) {
    return parseInt(checkbox.dataset.cost)
  } else {
    return 0
  }
}

function updateMsrp(event) {
  const container = event.target.parentElement.parentElement
  let msrpNum

  if (event.target.type === 'checkbox') {
    const checkboxes = container.querySelectorAll('input')

    let costs = []

    checkboxes.forEach((checkbox) => {
      costs.push(getCheckboxCost(checkbox))
    })

    msrpNum = costs.reduce((a, b) =>{
      return a + b
    })
  } else {
    msrpNum = parseInt(event.target.dataset.cost)
  }

  const feature = container.id
  let totalMsrp = 0

  allMsrp[feature] = msrpNum


  for(let msrp in allMsrp) {
    totalMsrp += allMsrp[msrp]
  }

  msrpField.textContent = totalMsrp

  if (feature !== 'car' && feature !== 'accessories') {
    const msrpValues = container.querySelectorAll('.msrp')

    msrpValues.forEach((msrpValue) => {
      msrpValue.textContent = msrpValue.dataset.cost - allMsrp[feature]
    })
  }
}
