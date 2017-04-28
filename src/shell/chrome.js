// 安装shell
import {INSERT_CSS,PREVIEW_ANIMATION,CHANGE_KEYFRAME,EXPORT_ANIMATION,REMOVE_ANIMATION,CHANGE_VIEW_ELEMENT,RESET_PARAMETER_CONFIG} from './event-types'
import {encodeScriptCode} from '../utils'



export default function installShell(bus){

  bus.$on(INSERT_CSS,_export => {
    // 动画节点插入
    var paramClass = ''
    var paramKeyframeId = _export.id
    var paramAnimation = encodeScriptCode(_export.animation)
    var paramKeyframe = encodeScriptCode(_export.keyframe)
    var options = encodeScriptCode(_export.options)

    chrome.devtools.inspectedWindow.eval(`css3AnimationGenerator.add($0,'${paramClass}','${paramKeyframeId}','${paramAnimation}','${paramKeyframe}','${options}')`,{
        useContentScriptContext: true
    },function(){

    });
    
  })


  bus.$on(CHANGE_KEYFRAME,_export => {
    // 用户尝试预览动画
    // var paramKeyframeId = encodeScriptCode(_export.id)
    // var paramAnimation = encodeScriptCode(_export.animation)
    // var paramKeyframe = encodeScriptCode(_export.keyframe)
    // chrome.devtools.inspectedWindow.eval(`css3AnimationGenerator.preview($0,'${paramKeyframeId}','${paramAnimation}','${paramKeyframe}')`,{
    //     useContentScriptContext: true
    // });
    
  })

  bus.$on(PREVIEW_ANIMATION,css => {
    console.log(css)
  })

  bus.$on(EXPORT_ANIMATION,config => {
    chrome.devtools.inspectedWindow.eval(`css3AnimationGenerator.export()`,{
      useContentScriptContext: true
    },function(){
      console.info('EXPORT_ANIMATION')
    })
  })

  bus.$on(REMOVE_ANIMATION,() => {
    chrome.devtools.inspectedWindow.eval(`css3AnimationGenerator.remove($0)`,{
      useContentScriptContext: true
    })
  })

  // chrome.runtime.onMessage.addListener(function(data){
  //     console.info('trigger shell : chrome.runtime.onMessage')
  //     console.log(arguments)
  //     if(data.type === 'global'){
  //         chrome.runtime.sendMessage({type:'global'})
  //     }
  // })

  /**
   * 用户选择元素的change事件，事件中获取到元素动画配置，发送回当前脚本
   */
  if(chrome.devtools){
    chrome.devtools.panels.elements.onSelectionChanged.addListener(el => {
      chrome.devtools.inspectedWindow.eval(`css3AnimationGenerator.getConfigByElment($0)`,{
        useContentScriptContext: true
      },function(config){
        // 解析config，映射到表单
        var reset = true
        if(config){
          try{
            var _conf = JSON.parse(config)
            bus.$emit(CHANGE_VIEW_ELEMENT,_conf)
            reset = false
          }catch(e){

          }
        }
        if(reset){
          bus.$emit(RESET_PARAMETER_CONFIG)
        }
      })
    })
  }


}