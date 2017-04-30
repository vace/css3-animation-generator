<docs>
  可配置的参数包括
  Animation name,Duration,Delay,Iteration Count,Timing function,Selector,
  animation-fill-mode
</docs>

<template>
<div class="layout-content">
  <Form :model="animation" :label-width="80">
    <Row>
      <Col span="21">
        <Form-item :label="'parameter_name' | lang">
          <Select v-model="animation.id" placeholder="animation-name" @input="changeAnimation" filterable clearable>
            <Option v-for="anim in CurrentAnimations" :label="anim.name" :value="anim.id" :key="anim.id">
              <span>{{ anim.name }}</span>
              <span style="float:right;color:#ccc">{{ anim.tags.join(',') }}</span>
            </Option>
          </Select>
        </Form-item>
      </Col>
      <Col span="3">
        <Poptip trigger="hover" :title="'parameter_remove' | lang" :content="'parameter_remove_tips' | lang" placement="bottom-end" style="float:right;">
            <Button @click="removeAnimation" type="info" shape="circle" icon="flash-off"></Button>
        </Poptip>
      </Col>
    </Row>
    <Form-item :label="'parameter_slider' | lang">
      <Slider v-model="animation.slider" range :tip-format="sliderTips" :step="100" :max="10000"></Slider>
    </Form-item>

    <Row>
      <Col span="12">
        <Form-item :label="'parameter_direction' | lang">
          <Select v-model="animation.direction" placeholder="animation-direction">
            <Option v-for="n in direction" :value="n" :key="n">{{ n }}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col span="12">
        <Form-item :label="'parameter_fill_mode' | lang">
          <Select v-model="animation.fillMode" placeholder="animation-fill-mode">
            <Option v-for="n in fillMode" :value="n" :key="n">{{ n }}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col span="12">
        <Form-item :label="'parameter_timing' | lang">
          <Select v-model="animation.timing" placeholder="animation-timing-function">
            <Option v-for="n in timing" :value="n" :key="n">{{ n }}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col span="12">
         <Form-item :label="'parameter_count' | lang">
          <Input-number :max="10000" :min="1" v-model="animation.count"></Input-number>
          <Checkbox v-model="animation.infinite">{{ 'parameter_infinite' | lang }}</Checkbox>
        </Form-item>
      </Col>
    </Row>

    <Form-item>
      <Button :disabled="!animation.id" @click="previewAnimation" type="primary">{{ 'parameter_preview' | lang }}</Button>
      <Button @click="exportAnimation" type="info" style="margin-left: 8px">{{ 'parameter_export' | lang }}</Button>
    </Form-item>

  </Form>
</div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {lang} from '../utils'

  const _defaultAnimation = {
    id: '',
    slider:[0,1000],
    direction: '',
    fillMode:'both',
    count:1,
    infinite:false,
    timing:''
  }

  export default {
    data () {
      return {
        animation: Object.assign({},_defaultAnimation),
        exportAnimationShow:false,
        direction:['normal','reverse','alternate','alternate-reverse'],
        fillMode:['none','forwards','backwards','both'],
        timing:['ease','linear','ease-in','ease-out','ease-in-out','step-start','step-end','steps']
      }
    },
    filters:{lang},
    computed:mapGetters(['CurrentAnimations']),
    mounted(){
      // 元素面板切换element，切换后获取当前element的config
      this.$shell.$on('change_view_element',config => {
        if(!config || !config.id){
          return false
        }
        this.$store
            .dispatch('changeKeyframeId',config.id)
            .then(() => this.animation = config)
      })
      // 重置config
      this.$shell.$on('reset_parameter_config',() => this.animation = Object.assign({},_defaultAnimation))
    },
    methods:{
      changeAnimation(val){
        // 当前项目被置空
        if(!val){
          return false
        }
        this.$store.dispatch('exportKeyframe',this.animation).then(_export => {
          this.$shell.$emit('insert_css',_export)
          // 默认改为插入动画。因为大部分动画不需要调试
          // this.$shell.$emit('change_keyframe',_export)
        })
      },
      removeAnimation(){
        this.$shell.$emit('remove_animation')
      },
      sliderTips(val){
        var slider = this.animation.slider
        return `${slider[0]/1000} s -> ${slider[1]/1000} s`
      },
      exportAnimation(){
        this.$shell.$emit('export_animation')
      },
      previewAnimation(){
        this.$store.dispatch('exportKeyframe',this.animation).then(_export => {
          this.$shell.$emit('insert_css',_export)
        })
      },
      onCopy(){
        console.log(this.animation.id)
        console.log('export')
      },
      onClose(){

      }
    }
  }
</script>

<style>
  .layout-content .ivu-form-item{
    margin-bottom:12px;
  }
</style>