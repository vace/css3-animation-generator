<template>
  <div class="layout-content">
    <Alert show-icon>
        {{ CurrentLibray.name }} <span style="color:#666;margin-left:10px;">[{{ CurrentLibray.creator }}]</span>
        <div style="float:right">
        <a target="__blank" :href="CurrentLibray.git"><Icon type="social-github"></Icon> github</a>
        </div>
        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
        <template slot="desc">{{ CurrentLibray.desc }}</template>
    </Alert>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed:mapGetters(['CurrentLibray'])
  }
</script>