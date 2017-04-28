<template>
<div class="layout-content">
  <Checkbox-group v-model="filterTags">
    <Checkbox v-for="(num,tag) in CurrentTags" :label="tag">
        <span>{{ tag }}</span><span class="__tag_num">(×{{ num }})</span>
    </Checkbox>
  </Checkbox-group>
</div>
</template>

<script>
  import {mapGetters,mapState} from 'vuex'
  export default {
    computed:{
      ...mapGetters(['CurrentTags']),
      filterTags:{
        get(){
          return this.$store.state.filters.tags
        },
        set(val){
          this.$store.commit('edit_tag_filter',val)
        }
      }
    },
    methods:{
      checkTag(tag){
        
      }
    }
  }
</script>

<style>
  .__tag_num{
    color:#0c6;
  }
</style>