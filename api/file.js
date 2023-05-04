const http = require('../utils/http')

module.exports = {
  uploadFile(data) {
    let form = new FormData()
    form.append('file', data)
    return http.post('/file/upload-single', form, { headers: { 'Content-Type': 'multipart/form-data' }, noLogin: false });
  }

  
}