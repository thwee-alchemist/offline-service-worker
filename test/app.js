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
  });
}else{
  console.log('Service workers not supported by user agent.');
}
