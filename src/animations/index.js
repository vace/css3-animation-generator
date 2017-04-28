import animate from './animate.json'
import magic from './magic.json'
import other from './other.json'

var __uid = 100000

function preDosth(lib){
  lib.animations.forEach(animation => {
    animation.id = ++__uid
  })
}

preDosth(animate)
preDosth(magic)
preDosth(other)

export default [animate,magic,other]