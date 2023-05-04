import http from '../utils/http'

export const sendVerifyCode = (phone) => {
  return http.get('/auth/send-verifycode', { phone: phone }, { noLogin: true });
}

export const Login = (phone, verifycode) => {
  return http.post('/auth/login/verifycode', { phone, verifycode }, { noLogin: true });
}