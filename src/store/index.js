import Vue from 'vue'
import Vuex from 'vuex'
import librarys from '../animations'


import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    // 动画库
    filters:{
      library_id:0, // 选择的库id
      group_name:'*', // 选择的分组id
      tag: '',
      // tags:[],  // 筛选的tags
      keyword:[], // 筛选额keyword
    },
    librarys,
    output:null
  },
  actions,
  getters,
  mutations,
  strict: true
})