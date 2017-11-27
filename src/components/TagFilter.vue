<template>
<div class="layout-content">
  <RadioGroup v-model="filterTags">
    <Radio v-for="(num,tag) in CurrentTags" :label="tag" :key="tag">
        <span>{{ tag }}</span><span class="__tag_num">(×{{ num }})</span>
    </Radio>
  </RadioGroup>
  <!--
  反馈，单选更加实用
  <Checkbox-group v-model="filterTags">
    <Checkbox v-for="(num,tag) in CurrentTags" :label="tag" :key="tag">
        <span>{{ tag }}</span><span class="__tag_num">(×{{ num }})</span>
    </Checkbox>
  </Checkbox-group>
  -->
</div>
</template>

<script>
  import {mapGetters,mapState} from 'vuex'
  export default {
    computed:{
      ...mapGetters(['CurrentTags']),
      filterTags:{
        get(){
          return this.$store.state.filters.tag
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