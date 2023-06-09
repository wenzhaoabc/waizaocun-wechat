var app = getApp()

let baseURL = 'http://47.103.223.106:5000'
// const baseURL = 'http://127.0.0.1:5000'
// const baseURL = 'http://100.80.86.3:5000'
// const baseURL = 'https://192.168.77.70:5001'
const baseMock = "https://mock.mengxuegu.com/mock/646c4d749d552b3b3b17cc9f"
const Token = app.globalData.token;

function http(url, options) {
  if (options.method == 'GET') {
    baseURL = baseMock;
  } else {
    baseURL = 'http://47.103.223.106:5000'
  }
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
  baseURL,
  get(url, data, params) {
    return http(url, {
      method: 'GET',
      data,
      ...params
    })
  },

  delete(url, data, params) {
    return http(url, {
      method: 'DELETE',
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