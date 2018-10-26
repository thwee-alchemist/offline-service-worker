self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/test/',
        '/test/app.js',
        '/test/index.html',
        '/test/404.html',
        '/test/signature_pad.min.js',
        '/test/index.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/test/404.html');
      });
    }
  }));
});

var signatures = [];

self.addEventListener('message', function(event){
  console.dir(event);
  if(event.data.command == 'signature'){
    signatures.push(event.data.signature);
    self.clients.matchAll().then(function(clients){
      clients.forEach(function(client){
        client.postMessage({
          reply: 'signature',
          signature: event.data.signature 
        })
      });
    });
  }else if (event.data.command == 'signatures'){
    self.clients.matchAll().then(function(clients){
      clients.forEach(function(client){
        client.postMessage({
          reply: 'signatures',
          signatures: signatures 
        })
      });
    });
  }
});

