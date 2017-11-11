const USE_WORKER = true

async function init () {
  if (USE_WORKER) {
    const worker = new Worker('app/worker.js')
    worker.onmessage = function (e) {
      renderSightings(e.data)
    }
    worker.postMessage('fetch')
  } else {
    const res = await UFOSightings.getData()
    renderSightings(res.data)
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

window.onload = init
