const URL = 'http://localhost:3000/api/v1/cars/'

function getCars() {
  return fetch(URL).then(res => res.json())
}

function getCar(carId) {
  return fetch(URL + carId).then(res => res.json())
}
