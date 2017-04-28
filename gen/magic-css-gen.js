const fs = require('fs')

const utils = require('./utils')
const library = require('./library')('Magic',{
  desc:'CSS3 Animations with special effects',
  git:'https://github.com/miniMAC/magic',
  demo:'https://minimamente.com/example/magic_animations/',
  version:'1.2.0',
  creator:'Christian',
  license:'MIT',
})

const css = fs.readFileSync(__dirname + '/css/magic.css','utf-8')

const GroupKey = [
  'puffIn','foolishIn','spaceInDown','perspectiveDown','rotateDown','slideDown','openDownLeft','tinDownIn'
]
const GroupString = [
  'Magic','Math','Space','Perspective','rotate','slide','open','tin'
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