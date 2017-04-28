/* global chrome */
//Handle request from devtools   
// chrome.runtime.onMessage.addListener(function(data){
//     console.info('trigger : chrome.runtime.onMessage')
//     console.log(arguments)
//     if(data.type === 'dev'){
//         chrome.runtime.sendMessage({debug:'debug'})
//     }
// })