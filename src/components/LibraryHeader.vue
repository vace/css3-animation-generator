<template>
  <div class="layout-library">
    <Menu mode="horizontal" theme="dark" :active-name="0" @on-select="changeLibrary">
     <div class="layout-nav">
       <Menu-item :name="idx" :key="name" v-for="(name,idx) in AnimateLibrarys" style="padding-left:10px;padding-right:10px;">
         <Icon type="social-css3"></Icon>
         {{ name }}
       </Menu-item>
     </div>
   </Menu>
   <Menu mode="horizontal" :active-name="$store.state.filters.group_name" @on-select="changeGroup">
     <div class="layout-assistant">
       <Menu-item name="*"><Icon type="android-apps"></Icon> </Menu-item>
       <Menu-item :name="group" :key="group" v-for="group in CurrentGroups">{{ group }}</Menu-item>
     </div>
   </Menu>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    computed:mapGetters(['AnimateLibrarys','CurrentGroups']),
    methods:mapActions(['changeLibrary','changeGroup'])
  }
</script>