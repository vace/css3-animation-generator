const fs = require('fs')

function Library(name){
  this.name = name
}

Library.prototype = {
  init(opt = {}){
    this.tags = new Set()
    // this.desc = opt.desc || '', // 动画库描述
    // this.git = opt.git || '', // 动画库git地址
    this.animations = [] // 动画库包含的动画列表
    Object.assign(this,opt)
  },
  addTags(tags = []){
    tags.forEach(tag => this.tags.add(tag))
  },
  add({group,name,keyframe,tags = []}){
    this.addTags(tags)
    this.animations.push({
      group,name,keyframe,tags
    })
  },
  export(){
    this.tags = Array.from(this.tags)
    var content = JSON.stringify(this)
    fs.writeFileSync(__dirname + '/../src/animations/' + this.name.toLowerCase() + '.json',content,'utf-8')
    console.log(`${this.name} export success`)
  }
}


/**
 * 注册添加一个动画库
 */
module.exports = function addLibrary(libraryName,opt = {}){
  var library = new Library(libraryName)
  library.init(opt)
  return library
}