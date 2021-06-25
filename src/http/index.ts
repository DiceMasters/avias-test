import axios, {AxiosInstance} from 'axios'

const API_URL = 'https://front-test.beta.aviasales.ru'

const $api: AxiosInstance = axios.create({
  baseURL: API_URL
})

export default $api
