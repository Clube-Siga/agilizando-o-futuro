navigator.serviceWorker.register('service-worker.js').then(function(registration) {
    console.log('Service Worker registrado com sucesso!');
  }).catch(function(error) {
    console.error('Falha ao registrar Service Worker:', error);
  });