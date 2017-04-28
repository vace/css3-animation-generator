import * as types from './mutation-types'

export const changeLibrary = ({commit,state},library_id) => {
  // 库名称
  if(typeof library_id === 'string'){
    library_id = state.librarys.findIndex(lib => lib.name === library_id)
  }
  if(state.filters.library_id === library_id){
    return false
  }
  // 清空选中的filters tag
  commit(types.CLEAR_TAG_FILTER)
  commit({
    type:types.CHANGE_LIBRARY,
    library_id
  })
}

export const changeGroup = ({commit,state},group_name) => {
  if(state.filters.group_name !== '*' && state.filters.group_name === group_name){
    return false
  }
  // 清空选中的filters tag
  commit(types.CLEAR_TAG_FILTER)

  commit({
    type:types.CHANGE_GROUP,
    group_name
  })
}

// 用户选择了某个详细的keyframeid，需要找到对应的libray和group
export const changeKeyframeId = ({commit,state},keyframeId) => {
  // 从各个库中查找对应的keyframeId
  state.librarys.find((library,idx) => {
    var animation = library.animations.find(animation => animation.id === keyframeId)
    // 找到对应的libaray
    if(animation){
      // 清空tags
      commit(types.CLEAR_TAG_FILTER)
      // 设置library
      commit({
        type:types.CHANGE_LIBRARY,
        library_id:idx
      })
      // 设置group
      commit({
        type:types.CHANGE_GROUP,
        group_name:animation.group
      })
      return true
    }
    return false
  })
}

/**
 * 根据配置导出动画
 * @param {*} param0 
 * @param {*} config 
 */
export const exportKeyframe = ({commit,getters},config) => {

  var id = config.id
  var animation = getters.CurrentLibray.animations.find(kf => kf.id === id)
  var [start,end] = config.slider
  var delay = start / 1000
  var duration = (end - start) / 1000
  var count = config.infinite ? 'infinite' : config.count
  var animationConfig = [animation.name,duration + 's',config.timing,delay + 's',count,config.direction,config.fillMode].filter(val => !!val).join(' ')
  var options = JSON.stringify(config)

  var _export = {
    id,
    name:animation.name,
    animation:animationConfig,
    keyframe:animation.keyframe,
    options:options
  }
  commit(types.EXPORT_ANIMATION,_export)
  return _export
}