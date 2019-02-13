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

function updateMsrp() {

  let totalMsrp = 0

  for(let msrp in allMsrp) {
   totalMsrp += allMsrp[msrp]
  }

  msrpField.textContent = totalMsrp

  const featureNames = [
    'powertrain',
    'exterior',
    'wheels',
    'interior'
  ]

  featureNames.forEach((featureName) => {
    const msrpValues = document.querySelector("#" + featureName).querySelectorAll('.msrp')

    msrpValues.forEach((msrpValue) => {
      msrpValue.textContent = msrpValue.dataset.cost - allMsrp[featureName]
    })
  })


}
