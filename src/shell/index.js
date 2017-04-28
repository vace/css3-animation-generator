import Vue from 'vue'
import installShell from './chrome'
import installShellDev from './dev'


const bus = new Vue()

if(process.env.NODE_ENV === 'development'){
  installShellDev(bus)
}else{
  installShell(bus)
}

Object.defineProperty(Vue.prototype,'$shell',{
  get(){
    return bus
  }
})



export default bus