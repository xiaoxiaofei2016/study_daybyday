import axios from '@/api/http'

export const api = {
  async get (url, data, config) {
    try {
      const res = await axios.get(url, { params: data }, config)
      return new Promise((resolve, reject) => {
        if (res.success) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      throw Error(err)
    }
  },
  async post (url, data, config) {
    try {
      const res = await axios.post(url, data, config)
      return new Promise((resolve, reject) => {
        if (res.success) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      throw Error(err)
    }
  }
}
