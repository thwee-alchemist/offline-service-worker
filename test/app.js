// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/test/sw.js', { scope: '/test/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

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

navigator.serviceWorker.addEventListener('message', function(event){
  console.log('Received message from SW:', event.data);

  if(event.data.reply == 'signatures'){
    var signatures = document.querySelector('#signatures');
    event.data.signatures.forEach(function(image_data){
      var image = new Image(500, 300);
      image.src = image_data;
      signatures.appendChild(image);
    })
  }
});

var canvas = document.querySelector('#signature-pad');
var signaturePad = new SignaturePad(canvas);

var button = document.querySelector('#submit-signature');
button.addEventListener('click', function(event){
  navigator.serviceWorker.controller.postMessage({
    command: 'signature',
    signature: signaturePad.toDataURL()
  });
  signaturePad.clear();
});

var get_signatures = document.querySelector('#get-signatures');
get_signatures.addEventListener('click', function(event){
  navigator.serviceWorker.controller.postMessage({
    command: 'signatures'
  });
})