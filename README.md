# Chrome Plugin Css3 Animation

快速给页面加上炫酷css3动画的chrome插件。

## 使用
### 1.从chrome webstore下载
[chrome应用商店安装地址](https://chrome.google.com/webstore/detail/lhbbbidpkalopmenjffckblgbdhcffpa)

### 2.直接下载crx文件
如果无法访问到chrome的应用商城，可以选择下载`app.crx`文件,在chrome中打开`chrome://extensions/`页面，将`app.crx`插件拖动到扩展程序面板即可完成安装。
[下载地址](https://github.com/vace/css3-animation-generator/releases/tag/v0.0.1)

### 3.自行构建
- `npm install -g vue-cli`
- `git clone https://github.com/vace/css3-animation-generator`
- `cd css3-animation-generator && npm install`
- `npm run app`


## 样式导出规则：
1. 优先使用带有 `c3`前缀的class，如 `<span class="c3-test">animate it</span>`
2. 如果存在class，则使用class选择器，如 `<span class="fl animate">animate it</span>`
3. 如果定义了Id，则使用id选择器，如 `<span id="anim1">animate it</span>`
4. 如果都不存在，则使用内部自定义的选择器查找方案


## 例子

![使用演示](static/usedemo.gif)

## tips
部分脚本中使用了 javascript 的`Set`，请尽量升级 chrome 到比较新的版本。测试使用的chrome48+都可以正常使用！导出的动画可能需要加前缀才可以兼容所有浏览器，推荐使用[autoprefix](http://autoprefixer.github.io/)，后期考虑加入这个功能。

## Remark

- [animate.css](https://github.com]daneden/animate.css)
- [magic.css](https://github.com/miniMAC/magic)
- [iview](https://github.com/iview/iview)
- [vue](https://github.com/vuejs/vue)
- [chrome developer](https://developer.chrome.com/extensions)
