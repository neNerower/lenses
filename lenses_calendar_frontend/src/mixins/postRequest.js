const postRequest = {
  methods: {
    /**
     * postRequest
     *
     * Mixin-метод для более удобного взаимодействия
     * с api для представлений авторизации.
     *
     * При неудаче выкидывает exception.
     *
     * @param {String} url адрес, по которому нужно
     * делать запрос
     * @param {Object} data данные, которые нужно
     * передать с запросом
     *
     * @returns {Object} ответ с сервера
     * @throws {Error} ошибка при неудаче
     */
    async postRequest (url, data) {
      const DEFAULT_HEADERS = { 'Content-type': 'application/json' }
      const BASE_URL = 'http://localhost:8000/lenses_calendar'

      const __url = `${BASE_URL}/${url}/`

      const response = await this.axios({
        method: 'POST',
        url: __url,
        data: data,
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

export default postRequest
