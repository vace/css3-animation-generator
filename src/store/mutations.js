import {EDIT_TAG_FILTER,CHANGE_LIBRARY,CHANGE_GROUP,EXPORT_ANIMATION,CLEAR_TAG_FILTER} from './mutation-types'

const mutations = {
  [EDIT_TAG_FILTER]({filters},payload){
    // filters.tags = payload
    filters.tag = payload
  },
  [CLEAR_TAG_FILTER]({filters}){
    // filters.tags.splice(0,filters.tags.length)
    filters.tag = ''
  },
  [CHANGE_LIBRARY]({filters},payload){
    filters.library_id = payload.library_id
    filters.group_name = '*'
  },
  [CHANGE_GROUP](state,payload){
    state.filters.group_name = payload.group_name
  },
  [EXPORT_ANIMATION](state,payload){
    state.output = payload
  }
}

export default mutations