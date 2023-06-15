import request from '@/config/axios/index.js'

const api = {
  Login: '/login',
}

export function Login(params) {
  return request({
    url: api.Login,
    method: 'post',
    // emulateJSON: true ,
    data: JSON.stringify(params)
  })
}

