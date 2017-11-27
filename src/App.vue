<template>
 <div class="layout">
   <LibraryHeader />
   <Parameter />
   <TagFilter />   
   <LibraryDetail />
   <PublicFooter />
 </div>
</template>

<script>
  import Parameter from './components/Parameter'
  import LibraryHeader from './components/LibraryHeader'
  import TagFilter from './components/TagFilter'
  import PublicFooter from './components/Footer'
  import LibraryDetail from './components/LibraryDetail'
  export default {
    components:{ LibraryHeader,Parameter,TagFilter,PublicFooter,LibraryDetail }
  }
</script>


<style>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    min-height:100vh;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    margin: 0 auto;
  }
  .layout-assistant{
    display:flex;
    overflow-x:scroll;
    margin: 0 auto;
    height: inherit;
  }
  .layout-assistant .ivu-menu-item{
   padding:0 10px;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    margin: 8px;
    background: #fff;
    border-radius: 4px;
    padding:10px;
    box-shadow:1px 1px 1px 0px #ccc;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>