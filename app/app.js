const USE_WORKER = true

async function init () {
  showSpinner()
  if (USE_WORKER) {
    const worker = new Worker('app/worker.js')
    worker.onmessage = function (e) {
      renderSightings(e.data)
      hideSpinner()
    }
    worker.postMessage('fetch')
  } else {
    const res = await UFOSightings.getData()
    renderSightings(res.data)
    hideSpinner()
  }
}

function renderSightings(data) {
  const list = document.querySelector('#sightings-list')
  const items = data.map(sighting => {
    const li = document.createElement('li')
    li.innerText = `${sighting['Date_time']}\t${sighting['description']}`
    return li
  })
  items.forEach(item => list.appendChild(item))
}

function showSpinner () {
  const spinner = document.querySelector('.loading-spinner')
  spinner.classList.remove('hidden')
}

function hideSpinner () {
  const spinner = document.querySelector('.loading-spinner')
  spinner.classList.add('hidden')
}

window.onload = init
