import {cacher} from '../utils'



// 获取当前动画库列表
export const AnimateLibrarys = ({librarys}) => {
  return librarys.map(lib => lib.name)
}

const GroupCache = Object.create(null)
// 获取当前选择的动画库
export const CurrentLibray = ({librarys,filters}) => {
  var library_id = filters.library_id
  return librarys[library_id]
}

// 获取当前选择的动画库中动画分组
export const CurrentGroups = ({librarys,filters}) => {
  var library_id = filters.library_id
  return cacher(`group_${library_id}`,() => {
    var library = librarys[library_id]
    var set = new Set()
    library.animations.forEach(group => set.add(group.group))
    var groups = Array.from(set)
    return groups
  })
}

// 获取当前选择的动画相关标签
export const CurrentTags = ({librarys,filters},getters) => {
  var library = getters.CurrentLibray
  var group_name = filters.group_name

  return cacher(`tag_${filters.library_id}_${group_name}`,() => {
    var tagsCache = Object.create(null)
    library.animations.forEach(({group,tags = []}) => {
      if('*' === group_name || group === group_name){
        tags.forEach(tag => {
          tagsCache[tag] = (tagsCache[tag] || 0) + 1
        })
      }
    })
    return tagsCache
  })
}

// 过滤之后用户可选的动画列表
export const CurrentAnimations = ({librarys,filters},getters) => {
  var library = getters.CurrentLibray
  var group_name = filters.group_name
  // var filter_tags = filters.tags || []
  // var hasTag = filter_tags.length > 0
  var tag = filters.tag || ''
  return cacher(`anim_${filters.library_id}_${group_name}_${tag}`, () => {
    var filters = library.animations.filter(({group,tags}) => {
      // 找到指定分组，使用tag过滤
      if('*' === group_name || group === group_name){
        if (tag){
          return tags.indexOf(tag) !== -1
        }
        return true
      }
      return false
    })
    return filters
  })
}


// export const CurrentS