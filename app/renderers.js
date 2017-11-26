export function renderElapsedTime (num, startedAt) {
  const el = document.querySelector('.elapsed-time')
  const secs = ((new Date()) - startedAt) / 1000
  el.innerText = `Loaded ${num} sightings in ${secs} seconds`
}

export function renderSightings(data) {
  const list = document.querySelector('#sightings-list')
  const items = data.map(sighting => {
    const li = document.createElement('li')
    li.innerText = `${sighting['Date_time']}\t${sighting['description']}`
    return li
  })
  items.forEach(item => list.appendChild(item))
}

export function renderSlider (onChange) {
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
    onChange({ fromYear, toYear })
  })
}

export function showSpinner () {
  const spinner = document.querySelector('.loading-spinner')
  spinner.classList.remove('hidden')
}

export function hideSpinner () {
  const spinner = document.querySelector('.loading-spinner')
  spinner.classList.add('hidden')
}

export function initCheckbox (onChange) {
  const cb = document.querySelector('#use-worker-cb')
  cb.onchange = e => onChange(e.target.checked)
}
