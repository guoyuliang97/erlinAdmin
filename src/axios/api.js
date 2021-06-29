var baseURL = ''


var origin=location.hostname
if(origin == 'localhost'){
  origin = 'http://112.74.45.176:8864'
  baseURL = origin
  // webs = 'ws://192.168.0.112:8282'
}
export default {
  baseURL
}
