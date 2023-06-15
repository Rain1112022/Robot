import axios from 'axios'

const request = axios.create({
    // 配置接口请求的基准路径
    baseURL: window.webServeURL, //  http://localhost:8000 
    timeout: 5000,//超时
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // const hasToken = window.sessionStorage.getItem("token")
    // if (store.getters.token ||  hasToken) {
    //   // console.log("设置令牌请求头X-Access-Token",store.getters.token, hasToken);
    //   // 设置令牌请求头
    //   config.headers['X-Access-Token'] = store.getters.token || hasToken
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 
request.interceptors.response.use(
  (response) => {
    // console.log("response",response);
    if(response.status == 200) {
    //   response.setContentType("text/text;charset=utf-8")
    // response.setCharacterEncoding("UTF-8")
        return response.data;
    } else {
        return response;
    }
},
(error)=> {
     console.log("error响应异常"); 
}
)
export default request;
