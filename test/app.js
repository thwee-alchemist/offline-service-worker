// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/test/sw.js', { scope: '/test/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
      cons
    }
    
    console.dir(reg);

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

// http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html#.W9Kuw2VKg5k
function send_message_to_sw(msg){
  return new Promise(function(resolve, reject){
      // Create a Message Channel
      var msg_chan = new MessageChannel();

      // Handler for recieving message reply from service worker
      msg_chan.port1.onmessage = function(event){
          if(event.data.error){
              reject(event.data.error);
          }else{
              resolve(event.data);
          }
      };

      // Send message to service worker along with port for reply
      navigator.serviceWorker.controller.postMessage('client_id?');
  });
}

navigator.serviceWorker.onmessage(function(msg){
  console.log(msg);
});

var canvas = document.querySelector('canvas');
var signaturePad = new signaturePad(canvas);

