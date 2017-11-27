const KeyFramesRegex = /@keyframes(.*){([^{}]*{[^}]*})*[^}]*}/ig

/**
 * 从text中获取到keyframes和keyframesName
 * 
 * @param {string} cssText 
 */
function genKeyframes(cssText){
  var match,result = []
  while((match = KeyFramesRegex.exec(cssText))){
    result.push({
      name:match[1].trim(),
      keyframe:match[0].trim()
    })
  }
  return result
}

function covertKeyFramesMap(keyframes) {
  var object = Object.create(null)
  keyframes.forEach(({name, keyframe}) => {
    object[name] = keyframe
  })
  return object
}

const hyphenateRE = /([^-])([A-Z])/g

function hyphenate(str){
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}


module.exports = {
  genKeyframes, covertKeyFramesMap ,hyphenate
}