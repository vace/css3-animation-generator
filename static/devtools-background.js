/* global chrome */

chrome.devtools.panels.elements.createSidebarPane("Css3Animation",function(sidebar){

  // sidebar.setPage('../index.html')
  sidebar.setPage('../index.html')

  sidebar.setHeight("100vh")

  // 显示的时候的事件
  // sidebar.onShown.addListener(function(win){

  // })

  // chrome.runtime.onMessage.addListener(function(data){
  //   console.info('trigger : chrome.runtime.onMessage')
  //   console.log(arguments)
  //   if(data.type === 'dev'){
  //       chrome.runtime.sendMessage({debug:'debug'})
  //   }
  // })
})