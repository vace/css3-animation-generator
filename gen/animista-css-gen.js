const fs = require('fs')

const utils = require('./utils')
const library = require('./library')('Animista', {
  desc: 'animista',
  version: '0.11.0',
  creator: 'Ana Travas',
  license: 'MIT',
  git: 'http://animista.net/',
  demo: 'http://animista.net/'
})

const animistaConfig = require('./css/animista.json').categories

const css = fs.readFileSync(__dirname + '/css/animista.css', 'utf-8')

let Results = utils.genKeyframes(css)

const animationGroup = Object.keys(animistaConfig)
const keyframesMap = utils.covertKeyFramesMap(Results)
animationGroup.map(group => {
  const item = animistaConfig[group].groups
  Object.values(item).map(({ variations }) => {
    var frame = Object.keys(variations).map(name => {
      let config = {
        name,
        group: group,
        keyframe: keyframesMap[name], 
        tags: utils.hyphenate(name).split('-').filter(tag => (tag != 1 * tag))
      }
      if (!config.keyframe) {
        console.error('export error: ', config)
      }
      library.add(config)
    })
  })
})

library.export()