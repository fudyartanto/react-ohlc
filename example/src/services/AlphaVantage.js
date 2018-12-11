// @flow
import Api from '../utils/Api'

export const getStockTimeSeriesDaily = (stockCode: string): Promise<{ data: Object }> => {
  return new Promise((resolve, reject) => {
    Api.get(`/query?function=TIME_SERIES_DAILY&symbol=${stockCode}`).then((response) => {
      if (response.data && typeof response.data.Note === 'string') {
        reject(response.data.Note)
      } else if (response.data && typeof response.data['Error Message'] === 'string') {
        reject(response.data['Error Message'])
      } else if (response.data) {
        resolve(response.data)
      } else {
        reject('Ups! Something went wrong')
      }
    }).catch(() => {
      reject('Ups! Something went wrong')
    })
  })
}
