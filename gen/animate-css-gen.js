const fs = require('fs')

const utils = require('./utils')
const library = require('./library')('Animate',{
  desc:'A cross-browser library of CSS animations. As easy to use as an easy thing.',
  version:'3.5.2',
  creator:'Daniel Eden',
  license:'MIT',
  git:'https://github.com/daneden/animate.css',
  demo:'https://daneden.github.io/animate.css/'
})

const css = fs.readFileSync(__dirname + '/css/animate.css','utf-8')

const GroupKey = [
  'bounce','bounceIn','fadeIn','flip','lightSpeed','rotateIn','hinge','zoomIn','slideInDown'
]
const GroupString = [
  'Attention','Bouncing','Fading','Flippers','Lightspeed','Rotating','Specials','Zoom','Sliding'
]

let GroupIndex = 0

let Results = utils.genKeyframes(css)

Results.map(({name,keyframe}) => {
  var idx = GroupKey.indexOf(name)
  if(idx !== -1){
    GroupIndex = idx
  }
  library.add({
    group:GroupString[GroupIndex],
    name,
    keyframe,
    tags:utils.hyphenate(name).split('-')
  })
})

library.export()