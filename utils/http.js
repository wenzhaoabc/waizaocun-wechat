const baseURL = 'http://daoxiangli.com:5000'
const Token = wx.getStorage('token')

function request(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + params.url,
      method: params.method || 'GET',
      data: params.data || {},
      header: { ...params.header, 'Author': "Bearer " + Token },
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

module.exports = {
  request
}