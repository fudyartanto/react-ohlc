import axios from 'axios'
import Config from '../constants/Config'
import axiosRetry from 'axios-retry'

const Api =  axios.create({
  baseURL: 'https://www.alphavantage.co',
})

Api.interceptors.request.use(function (config) {
  return new Promise((resolve) => {
    config.params = {
      apikey: Config.ALPHA_VANTAGE_API_KEY
    }
    resolve(config)
  })
}, function (error) {
  return Promise.reject(error)
})

axiosRetry(Api, { retries: 3 })

export default Api
