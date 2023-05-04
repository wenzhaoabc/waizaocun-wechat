var app = getApp()

// const baseURL = 'http://daoxiangli.com:5000'
const baseURL = 'http://127.0.0.1:5000'
const Token = app.globalData.token;

function http(url, options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method: options.method || 'GET',
      data: options.method == "GET" ? options.data : JSON.stringify(options.data),
      header: options.noLogin ? { ...options.headers } : { ...options.headers, 'Authorization': "Bearer " + Token },
      success: res => {
        if (res.header['Token-Expired']) {
          wx.showToast({
            title: '登录过期',
            icon: 'error'
          })
          wx.navigateTo({
            url: '../pages/login/index'
          })
        } else {
          resolve(res);
        }
      },
      fail: err => {
        reject(err);
      }
    })
  })
}


module.exports = {
  get(url, data, params) {
    return http(url, {
      method: 'GET',
      data,
      ...params
    })
  },

  post(url, data, params) {
    return http(url, {
      method: 'POST',
      data,
      ...params
    })
  }
}