import axios from './request.js'
import Global from './api.js'
var baseUrl = '/myApi'
export  function post(url,params){
  return new Promise((resolve,reject) => {
    axios.post(baseUrl + url , params).then(
    res=>{
      resolve(res)
    },
    err=>{
      reject(err)
    }
    )
  })
}


export  function get(url,params){
  return new Promise((resolve,reject) => {
    axios.get(baseUrl + url,{
      params: params,
    })
    .then(
    res=>{
      resolve(res)
    },
    err=>{
      reject(err)
    }
    )
  })
}


export  function dele(url,params){
  return new Promise((resolve,reject) => {
    axios.delete(baseUrl + url,params)
    .then(
    res=>{
      resolve(res)
    },
    err=>{
      reject(err)
    }
    )
  })
}
