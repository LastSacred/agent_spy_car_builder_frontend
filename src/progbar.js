const progressComplete = {
  car: false,
  powertrain: false,
  exterior: false,
  wheels: false,
  interior: false,
  accessories: false
}

function progressCompleted(section) {
  progressComplete[section] = true

  const progbar = document.querySelector('.progress-bar')
  let progress = 4

  for (let portion in progressComplete) {
    if (progressComplete[portion]) {
      progress += 16
    }
  }

  progbar.style.width = progress + "%"
}
