/* global chrome */

/**
 * 后台任务，插入样式表，导出样式表
 */

window.css3AnimationGenerator = 
(function(){
  function Control(port){
    this.inited = false
  }
  Control.prototype = {
    _init:function(){
      if(this.inited){
        return 
      }
      this.inited = true
      this.styles = []
      this.keyframeIdCache = Object.create(null)
      var styleAnimation = document.createElement('style')
      var styleKeyframes = document.createElement('style')

      var head = this.documentHead =  document.head || query('head') || query('body')
      styleAnimation.type = styleKeyframes.type = 'text/css'

      styleAnimation.dataset.desc = 'Chrome Plugin > Css3Animation Element Style'
      styleKeyframes.dataset.desc = 'Chrome Plugin > Css3Animation Keyframes'

      head.appendChild(styleAnimation)
      head.appendChild(styleKeyframes)
      this.styleAnimation = styleAnimation
      this.styleKeyframes = styleKeyframes

    },

    /**
     * 向页面添加动画
     * 
     * @param {HtmlElement} element 
     * @param {string} className 用户指定的类名称
     * @param {string} keyframeId 动画唯一id
     * @param {string} animation 动画类型
     * @param {string} keyframes 动画帧描述
     */
    add:function(element,className,keyframeId,animation,keyframes,options){
      this._init()
      this._addKeyframe(keyframeId,keyframes)
      // add animations
      var selector = this._getElementSelector(element)
      var style = this.styles.find(function(style){
        return style.selector === selector
      })
      if(style){
        style.element = element
        style.className = className
        style.keyframeId = keyframeId
        style.animation = animation
        style.options = options
      }else{
        this.styles.push({selector,element,className,keyframeId,animation,options})
      }

      this.render()
    },
    // 预览动画，预览时动画不用全部执行，只执行当前选择的element
    preview:function(element,keyframeId,animation,Keyframes,options){
      this._init()
      this._addKeyframe(keyframeId,Keyframes,options)
      // 向后追加动画
      var selector = this._getElementSelector(element)
      var css = `${selector}{animation:${animation}}`
      var node = document.createTextNode(css)
      this.styleAnimation.appendChild(node)
    },

    // 导出动画
    export:function(){
      this._init()
      // 导出动画，对于内部项目vuep只导出animation即可
      var keyframesUsed = new Set()
      var animations = this.styles.map(style => {
        // 是否定义了className，没有定义根据查找规则进行查找
        keyframesUsed.add(style.keyframeId)
        var className = style.className || exportElement(style.element)
        return `${className}{animation:${style.animation}}`
      }).join('\n')     

      var keyframeIdCache = this.keyframeIdCache
      
      var keyframes = Array.from(keyframesUsed).map(frameId => {
        return keyframeIdCache[frameId] || ''
      }).join('\n')

      this._exportConsole(animations,keyframes)
      this._exportBlank(animations,keyframes)
    },
    getConfigByElment(element){
      var _unique = element._unique
      if(!_unique){
        return false
      }
      var selector = `[${_unique}]`
      // 查找动画的配置
      var style = this.styles.find(function(style){
        return style.selector === selector
      })
      
      return style.options
    },
    _exportBlank:function(animations,keyframes){
      var win = window.open()
      win.document.title = 'css3-animation-generator'
      win.document.write(exportHtml(animations,keyframes));
      return win
    },
    // 在console中导出
    _exportConsole:function(animations,keyframes){
      console.info(' ---- START EXPORT ANIMATION ---- ')
      console.group('export animations : ')
      console.log('\n\n/!* export by [css3-animation-generator] */\n' + animations + '\n\n\n')
      console.groupEnd()

      console.group('export keyframes : ')
      console.log('\n\n\n' + keyframes + '\n\n\n')
      console.groupEnd()
      console.info(' ---- ENDED EXPORT ANIMATION ---- ')
    },
    // 移除当前元素的动画
    remove:function(element){
      this._init()
      var selector = this._getElementSelector(element)
      var idx = this.styles.findIndex(function(style){
        return style.selector === selector
      })
      if(idx !== -1){
        this.styles.splice(idx,1)
        return '已经移除了元素的动画'
      }else{
        return '该元素上未设置动画'
      }
    },

    _addKeyframe:function(keyframeId,keyframes){
      var keyframeIdCache = this.keyframeIdCache
      // add keyframes
      if(!keyframeIdCache[keyframeId]){
        keyframeIdCache[keyframeId] = keyframes
        var keyframeNode = document.createTextNode(keyframes)
        this.styleKeyframes.appendChild(keyframeNode)
      }
    },
    /**
     * 获取元素唯一选择器
     */
    _getElementSelector:function(element){
      var _unique = element._unique
      if(!_unique){
        _unique = 'c3-' + unique()
        element._unique = _unique
        element.setAttribute(_unique,'')
      }
      return `[${_unique}]`
    },
    render:function(){
      var styleCss = '',styles = this.styles
      styles.forEach(function(style){
        styleCss += `${style.selector}{animation:${style.animation}}`
      })
      // this.styleAnimation.remove()
      this.styleAnimation.innerText = ''
      var _this = this
      setTimeout(function(){
        var node = document.createTextNode(styleCss)
        _this.styleAnimation.appendChild(node)
        // _this.documentHead.appendChild(_this.styleAnimation)
      })
    },
    replay:function(cssText){
      this._init()
    }
  }

  // chrome.runtime.onMessage.addListener(function(msg){
  //   console.log('runtime msg',msg)
  // })

  // chrome.extension.onMessage.addListener(function (message, sender) {
  //     console.log("In content Script Message Recieved is " + message);
  //     //Send needed information to background page
  //     chrome.extension.sendMessage("My URL is" + window.location.origin);
  // });

  var regexBest = /^(c3|vp)\-/i // 对于c3-或者vp-开头的class 有限接收

  return new Control()

  // 获取元素
  function query(el) {
    return document.querySelector(el);
  }

  function unique(){
    return (((1 + Math.random()) * 0x1000000)|0).toString(16).substring(1)
  }

  function exportElement(element){
    // 匹配elemnet的className
    var length = element.classList.length
    if(length){
      var cls , bad = []
      for(var i = 0 ; i < length ; i++){
        cls = element.classList.item(i)
        if(regexBest.test(cls)){
          return '.' + cls
        }
        bad.push('.' + cls)
      }
      // 未匹配到最优class,但是有class，则直接返回此选择器
      return bad.join('')
    }
    // 寻找id选择器
    if(element.id){
      return '#' + element.id
    }
    var name = element.localName
    if(name === 'body' || name === 'html' ){
      return name
    }
    // 尝试查找父选择器是否满足条件
    if(element.parentNode){
      var parent = exportElement(element.parentNode)
      return parent + '>' + name
    }
    return name
  }

  function exportHtml(animations,keyframes){
    let CDN_BASE = '//cdn.bootcss.com/codemirror/5.25.0'
    if(typeof chrome === 'object' && chrome.extension){
      CDN_BASE = chrome.extension.getURL('static/codemirror5.25.0')
    }
// const CDN_BASE = '//unpkg.com/codemirror@5.25.2/'

    return  `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="apple-mobile-web-app-title" content="vace"/>
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <title>VaceCss3Animation</title>
</head>
<body>
<style>
  *{padding: 0;margin: 0;}
  html,body,.app{width: 100%;height: 100%;}
  .app .CodeMirror{ height: 100%; }
  .col{
    width: 50%;float: left;box-sizing: border-box;
    height: 100%;
  }
  .col-right{
    border-left: 1px solid #9E9E9E;
  }
</style>
<link href="${CDN_BASE}/codemirror.min.css" rel="stylesheet">
<link href="${CDN_BASE}/addon/hint/show-hint.min.css" rel="stylesheet">
<link href="${CDN_BASE}/theme/monokai.min.css" rel="stylesheet">
<script charset="utf-8" src="${CDN_BASE}/codemirror.min.js"></script>
<script charset="utf-8" src="${CDN_BASE}/addon/hint/show-hint.min.js"></script>
<script charset="utf-8" src="${CDN_BASE}/mode/css/css.min.js"></script>
<script charset="utf-8" src="${CDN_BASE}/addon/hint/css-hint.min.js"></script>
<div class="app">
<div class="col">
  <textarea id="code" name="code">
/* Export Animations */
${animations}
  </textarea>
</div>
<div class="col col-right">
  <textarea id="code1" name="code">
/* export keyframes  */
${keyframes}
  </textarea>
</div>
</div>

<script charset="utf-8">
  /* global CodeMirror */
  CodeMirror.fromTextArea(document.getElementById("code"), {
    extraKeys: {"Ctrl-Space": "autocomplete"},
    theme:'monokai',
    lineNumbers:true
  });
  CodeMirror.fromTextArea(document.getElementById("code1"), {
    extraKeys: {"Ctrl-Space": "autocomplete"},
    theme:'monokai',
    lineNumbers:true
  });
</script>
</body>
</html>`
  }
})()