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
      console.log(progress)
    }
  }
  if (progress === 100) {
      const savebtn = document.querySelector('#save-background')
      const savebtnp = document.querySelector('#save-btn-p')
      const savebtnspan = document.querySelector('#save-btn-span')
      savebtn.classList.add("save-btn-color");
      savebtnp.classList.add("save-btn-p");
      savebtnspan.classList.add("save-btn-span");
  }
  progbar.style.width = progress + "%"
}
