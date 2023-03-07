import request from '@/config/axios/index.js'

const api = {
  jointPosition: '/api/control/manual/jointPosition/movj', //关节位置
  tcpPosition: '/api/control/manual/tcpPosition/movj', //Tcp位置
  tcpGesture: '/api/control/manual/tcpPosition/movj', //Tcp姿态
}

export function jointPosition(params) {
  return request({
    url: api.jointPosition,
    method: 'post',
    data: params
  })
}
export function tcpPosition(params) {
  return request({
    url: api.tcpPosition,
    method: 'post',
    data: params
  })
}
export function tcpGesture(params) {
  return request({
    url: api.tcpGesture,
    method: 'post',
    data: params
  })
}
