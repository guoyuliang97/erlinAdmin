import axios from './request.js'
import Global from './api.js'
var baseUrl =  '/myApi'
export  function post(url,params,hearder){
  console.log(hearder)
  return new Promise((resolve,reject) => {
    axios.post(baseUrl + url , params).then(
    res=>{
      if(res.data.code == 200){
        resolve(res)
      }
    },
    err=>{
      reject(err)
    }
    )
  })
}


export  function get(url,params,hearder){
  return new Promise((resolve,reject) => {
    axios.get(baseUrl + url,{
      params: params,
    },hearder)
    .then(
    res=>{
      if(res.data.code == 200){
        resolve(res)
      }
    },
    err=>{
      reject(err)
    }
    )
  })
}


export  function dele(url,params,hearder){
  return new Promise((resolve,reject) => {
    axios.delete(baseUrl + url,params,hearder)
    .then(
    res=>{
       if(res.data.code == 200){
         resolve(res)
       }
    },
    err=>{
      reject(err)
    }
    )
  })
}
