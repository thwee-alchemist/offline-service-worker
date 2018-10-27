# offline-service-worker
An attempt at creating an offline service worker from resources.

* `index.js`: a small express server, serving up the static directory test/
* `test/index.html`: a page including a [signature pad](https://github.com/szimek/signature_pad), a button for submitting it to the background worker, and a button for retrieving the list of images. 
* `test/app.js`: plain javascript setting up a service worker and event handlers for the two buttons. 
* `test/sw.js`: a service worker that caches resources and stores the signatures, returning them upon command.

To try this experiment, Open Development Tools (in Chrome), and visit https://offline-service-worker.herokuapp.com/test/. Experiment with setting the "Offline" checkmark, and refreshing the page. 
