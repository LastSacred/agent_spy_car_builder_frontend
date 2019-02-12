const msrpField = document.querySelector('#total-msrp')

const allMsrp = {
  car: 0,
  powertrain: 0,
  exterior: 0,
  wheels: 0,
  interior: 0,
  accessories: 0
}

function updateMsrp(event) {
  const msrpNum = parseInt(event.target.parentElement.querySelector('.msrp').dataset.cost)
  const container = event.target.parentElement.parentElement
  const feature = container.id
  let totalMsrp = 0

  allMsrp[feature] = msrpNum


  for(let msrp in allMsrp) {
    totalMsrp += allMsrp[msrp]
  }

  msrpField.textContent = totalMsrp

  if (feature !== 'car') {
    const msrpValues = container.querySelectorAll('.msrp')

    msrpValues.forEach((msrpValue) => {
      msrpValue.textContent = msrpValue.dataset.cost - allMsrp[feature]
    })
  }
}
