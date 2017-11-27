module.exports = {
  entry: {
    index: 'main.js'
  },
  autoprefixer:{
    browsers:['last 1 versions']
  },
  html:{
    title: 'Css3AnimationGenrator',
    template:'./index.html'
  },
  webpack:{
    output:{
      publicPath:''
    }
  }
}