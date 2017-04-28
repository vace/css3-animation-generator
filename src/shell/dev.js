// 安装shell
import {INSERT_CSS,PREVIEW_ANIMATION,CHANGE_KEYFRAME,EXPORT_ANIMATION,REMOVE_ANIMATION,CHANGE_VIEW_ELEMENT} from './event-types'


function createStyle(){
  var style = document.createElement('style'),
	head = document.head || query('head') || query('body')
	style.type = 'text/css'
  head.appendChild(style)
  return style
}

function query(el) {
    return document.querySelector(el);
}

function log(...args){
  args.unshift('[DevLog]')
  console.log(...args)
}

export default function installShell(bus){
  // 模拟绑定动画元素
  document.addEventListener('keydown',e => {
    // if(e.keyCode === 220){ //\
    //   bus.$emit(CHANGE_VIEW_ELEMENT,{
    //     id: 100142,
    //     slider:[3000,4000],
    //     direction: '',
    //     fillMode:'',
    //     count:1,
    //     infinite:false,
    //     timing:'ease',
    //     css3prefix:[]
    //   })
    //   console.log('dev')
    // }
  })

  var styleElement = false
  var insertedKeyframes = []

  bus.$on(INSERT_CSS,_export => {
    console.log('insert')
    if(!styleElement){
      styleElement = createStyle()
    }
    var css = `.layout-copy{animation:${_export.animation}}`
    // 动画节点插入
    if(insertedKeyframes.indexOf(_export.id) === -1){
      css += `\n${_export.keyframe}`
      insertedKeyframes.push(_export.id)
    }
    var cssElement = document.createTextNode(css)
    styleElement.appendChild(cssElement)
  })

  // 用户更新了动画
  bus.$on(CHANGE_KEYFRAME,_export => {
    log('预览动画效果',_export.name)
    // 用户尝试预览动画
  })

  bus.$on(EXPORT_ANIMATION,config => {
    log('导出用户动画，配置',config)
  })
  bus.$on(REMOVE_ANIMATION,() => {
    log('移除选中元素的动画')
  })

  bus.$on(PREVIEW_ANIMATION,css => {
    console.log(css)
  })

}