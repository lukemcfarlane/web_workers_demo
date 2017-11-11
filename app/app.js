async function init () {
  const res = await fetch('http://localhost:9292?page=1&per_page=100')
  const json = await res.json()
  renderSightings(json.data)
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
