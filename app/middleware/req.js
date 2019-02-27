const axios = require('axios')

const BASE_URL = 'https://api.paixin.com'

axios.interceptors.request.use(
  config => {
    let isNoCookie = (config.baseURL == BASE_URL)

    if (isNoCookie) {
      config.headers['no-cookie'] = '1'
      if (global.xToken) {
        config.headers['x-token'] = global.xToken
      }
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const xToken = response.headers['x-token']
    if (xToken || xToken == '') {
      global.xToken = xToken
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

// const _req = (url, data = {}, params = {}, method = 'POST') => {
//   const config = {
//     baseURL: BASE_URL,
//     method: method,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     url: url,
//     data: data,
//     params: params
//   }

//   return axios(config)
// }

module.exports = () => {
  return async (ctx, next) => {
    ctx.axios = axios

    await next();
  }
}
