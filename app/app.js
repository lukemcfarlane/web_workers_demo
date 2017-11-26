import './nouislider.min.js'
import {
  renderElapsedTime,
  renderSightings,
  renderSlider,
  showSpinner,
  hideSpinner,
  initCheckbox
} from './renderers.js'

let useWorker = false

function init () {
  renderSlider(loadSightings)
  initCheckbox(checked => useWorker = checked)
}

async function loadSightings ({ fromYear, toYear }) {
  showSpinner()
  const startedAt = new Date()
  const params = {fromYear, toYear}
  if (useWorker) {
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
