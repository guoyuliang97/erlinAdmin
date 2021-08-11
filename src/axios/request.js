import axios from 'axios'
import {Message,Loading} from 'element-ui'
import router from '../router'
//设置超时时间
axios.defaults.time = 5000

//定义一个加载变量
var LoadingServe
axios.interceptors.request.use(
  config=>{
    LoadingServe = Loading.service({fullscreen:true})
    let token =localStorage.getItem('elToken')
    if (token) {
      config.headers['Authorization'] = token
      config.headers['content-type'] = 'application/json'
    }
    return config
  },
  error => {
      return Promise.reject(error)
  }
)

axios.interceptors.response.use(res => {
    LoadingServe.close()
    var data = res.data.code
    switch(data){
        case 500:
            Message.error({
                message:res.data.message
            })

            break;


    }
    return res

},error =>{
    console.log(error)
    LoadingServe.close()
    Message.error({
            message:'网络好像有点不好哟，刷新一下吧!'
        })
    return Promise.reject(error)
})


export default axios
