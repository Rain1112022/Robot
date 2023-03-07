import request from '@/config/axios/index.js'

const api = {
  Login: '/api/login',
  getHello: '/api/hello',
}

export function Login(params) {
  return request({
    url: api.Login,
    method: 'post',
    data: params
  })
}
export function getHello(params) {
  return request({
    url: api.getHello,
    method: 'get',
    params
  })
}

