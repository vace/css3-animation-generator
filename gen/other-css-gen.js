/**
 * 其他动画库。可由用户更新
 */

const fs = require('fs')

const utils = require('./utils')
const library = require('./library')('Other',{
  desc:'Other CSS3 Animations with special effects',
  git:'https://github.com/vace/css3-animation-generator/gen/other',
  demo:'',
  version:'0.0.1',
  creator:'Vace',
  license:'MIT'
})

const ListGroup = ['sheet','effect','collect']


ListGroup.map(group => {
  var css = fs.readFileSync(__dirname + '/other/' + group + '.css','utf-8')
  var keyframes = utils.genKeyframes(css)
  keyframes.forEach(({name,keyframe}) => {
    library.add({
      group,
      name,
      keyframe,
      tags:utils.hyphenate(name).split('-')
    })
  })
})

library.export()
