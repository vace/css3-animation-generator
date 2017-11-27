import animate from './animate.json'
import magic from './magic.json'
import animista from './animista.json'
import other from './other.json'

var __uid = 100000

function preDosth(lib){
  lib.animations.forEach(animation => {
    animation.id = ++__uid
  })
}

preDosth(animate)
preDosth(magic)
preDosth(animista)
preDosth(other)

export default [animate, magic, animista, other]