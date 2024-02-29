self.addEventListener('push', event => {
  self.registration.showNotification("Frontend Masters", {
    body: 'The best place to learn web development online',
    icon: '/images/icon.png',
  })
});

self.addEventListener('sync', event => {
  switch (event.tag) {
    case 'like':
      console.log('Sync operation for like received')
      // Perform action here fetch, db-action, etc
      break;
    default:
      console.log(`Unknown sync event received for ${event.tag}`)
  }
})

self.addEventListener('periodicsync', event => {
  switch (event.tag) {
    case 'daily-news':
      console.log('Periodic Sync operation for daily-news')
      // Perform action here fetch, db-action, etc
      break;
    default:
      console.log(`Unknown Periodic sync event received for ${event.tag}`)
  }
})

self.addEventListener('backgroundfetchsuccess', async event => {
  console.log('files received')
  // Do something here with files
  // const downloadedFiles = await event.registration.matchAll();
})