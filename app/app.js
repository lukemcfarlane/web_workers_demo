import './nouislider.min.js'

const USE_WORKER = false

function init () {
  renderSlider()
}

async function loadSightings (fromYear, toYear) {
  showSpinner()
  const startedAt = new Date()
  const params = {fromYear, toYear}
  if (USE_WORKER) {
    const worker = new Worker('app/worker.js')
    worker.onmessage = function (e) {
      renderSightings(e.data)
      renderElapsedTime(e.data.length, startedAt)
      hideSpinner()
    }
    worker.postMessage(params)
  } else {
    const res = await UFOSightings.getData(params)
    renderSightings(res.data)
    renderElapsedTime(res.data.length, startedAt)
    hideSpinner()
  }
}

function renderElapsedTime (num, startedAt) {
  const el = document.querySelector('.elapsed-time')
  const secs = ((new Date()) - startedAt) / 1000
  el.innerText = `Loaded ${num} sightings in ${secs} seconds`
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

function renderSlider () {
  const slider = document.getElementById('year-slider')

  noUiSlider.create(slider, {
    start: [1980, 1990],
    step: 1,
    tooltips: true,
    connect: true,
    range: {
      min: 1900,
      max: 2017
    },
    format: {
      to (value) {
        return parseInt(value)
      },
      from (value) {
        return value
      }
    }
  })

  slider.noUiSlider.on('set', e => {
    const [fromYear, toYear] = e
    loadSightings(fromYear, toYear)
  })
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
