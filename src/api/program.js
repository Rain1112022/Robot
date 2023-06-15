import request from '@/config/axios/index.js'

const api = {
  runProgram: '/api/program/run_program', //运行
  debugProgram: '/api/program/debug_program', //调试
  pauseProgram: '/api/program/pause_program', //暂停
}

export function runProgram(params) {
  return request({
    url: api.runProgram,
    method: 'post',
    data: JSON.stringify(params)
  })
}
export function debugProgram(params) {
  return request({
    url: api.debugProgram,
    method: 'post',
    data: JSON.stringify(params)
  })
}
export function pauseProgram() {
  return request({
    url: api.pauseProgram,
    method: 'post',
  })
}
