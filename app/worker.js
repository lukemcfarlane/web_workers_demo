self.importScripts('./ufo_sightings.js')
onmessage = function (e) {
  UFOSightings.getData().then(res => {
    postMessage(res.data)
  })
}
