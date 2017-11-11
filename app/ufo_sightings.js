class UFOSightings {
  static async getData () {
    const res = await fetch('http://localhost:9292?page=1&per_page=100')
    return res.json()
  }
}
