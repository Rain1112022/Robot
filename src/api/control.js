import request from '@/config/axios/index.js'

const api = {
  jointPosition: '/api/control/manual/jointPosition/movj', //关节位置
  tcpPosition: '/api/control/manual/tcpPosition/movj', //Tcp位置
  tcpGesture: '/api/control/manual/tcpPosition/movj', //Tcp姿态
  packingPosition: '/api/common/package', //装箱位置
  jogMove: '/api/control/manual/jog',// jog点动
  spaceMove: '/api/control/manual/moveTo',  //运行至
  setJointDrag: '/api/teach/drag',// 切换运行模式
  getJointPoints: '/api/teach/getPoints',// 获取所有示教点
  saveJointPoint: '/api/teach/getCurPoint',// 保存示教点
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

export function packingPosition() {
  return request({
    url: api.packingPosition,
    method: 'post',
  })
}
export function jogMove(params) {
  return request({
    url: api.jogMove,
    method: 'post',
    data: params
  })
}

export function spaceMove(params) {
  return request({
    url: api.spaceMove,
    method: 'post',
    data: params
  })
}

export function setJointDrag(params) {
  return request({
    url: api.setJointDrag,
    method: 'post',
    data: params
  })
}

export function getJointPoints() {
  return request({
    url: api.getJointPoints,
    method: 'get',
  })
}

export function saveJointPoint(params) {
  return request({
    url: api.saveJointPoint,
    method: 'post',
    data: params
  })
}






