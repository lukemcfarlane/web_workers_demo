const BASE_URL = 'http://localhost:9292'

class UFOSightings {
  static async getData (params = {}) {
    const url = `${BASE_URL}?page=1&per_page=5` +
      `&from_year=${params.fromYear}` +
      `&to_year=${params.toYear}`
    const res = await fetch(url)
    return res.json()
  }
}
