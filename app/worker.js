self.importScripts('./ufo_sightings.js')
onmessage = function (e) {
  UFOSightings.getData(e.data).then(res => {
    postMessage(res.data)
  })
}
