const getRequest = {
  methods: {
    async getRequest (url) {
      const DEFAULT_HEADERS = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt_access')
      }
      const BASE_URL = 'http://localhost:8000/lenses_calendar'

      const __url = `${BASE_URL}/${url}/`

      const response = await this.axios({
        method: 'GET',
        url: __url,
        headers: DEFAULT_HEADERS
      })

      if (response.status !== 200 && response.status !== 201) {
        // console.error('AN API ERROR', response.error)
        throw new Error(response.error)
      }

      return response
    }
  }
}

export default getRequest
