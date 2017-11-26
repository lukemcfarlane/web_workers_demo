import './nouislider.min.js'
import {
  renderElapsedTime,
  renderSightings,
  renderSlider,
  showSpinner,
  hideSpinner
} from './renderers.js'

const USE_WORKER = false

function init () {
  renderSlider(loadSightings)
}

async function loadSightings ({ fromYear, toYear }) {
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

window.onload = init
