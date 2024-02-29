navigator.serviceWorker.register('/service-worker.js');

// Page Visibility API
let backgroundInitialTimestamp;

window.addEventListener('visibilitychange', event => {
  if (document.visibilityState === 'hidden') {
    // We are in the background
    const now = new Date().toLocaleTimeString();
    log(`Going to the background at ${now}`)
    backgroundInitialTimestamp = performance.now();
  } else {
    // We are back from the background
    const timeElapsed = parseInt(performance.now() - backgroundInitialTimestamp);
    log(`Back to the foreground after ${timeElapsed/1000}s`)
  }
})

// Beacon
document.getElementById("btnBeacon").addEventListener("click", event => {
  const data = {
    message: 'Hello from frontend'
  }
  const blob = new Blob([JSON.stringify(data)], {type : 'application/json'})
  navigator.sendBeacon('/log', blob)
});

// Background Sync
document.getElementById("btnSync").addEventListener("click", async event => {
  const swReg = await navigator.serviceWorker.ready;
  swReg.sync.register('like');
});

// Background Periodic Sync
document.getElementById("btnPeriodicSync").addEventListener("click", async event => {
  const swReg = await navigator.serviceWorker.ready;
  const permissionStatus = await navigator.permissions.query({name: 'periodic-background-sync'});
  if (permissionStatus.state === 'granted') {
    swReg.periodicSync.register('daily-news', {
      minInterval: 12 * 60 * 60 * 1000
    });
  }
});

// Background Fetch
document.getElementById("btnFetch").addEventListener("click", async event => {
  const swReg = await navigator.serviceWorker.ready;
  await swReg.backgroundFetch.fetch(
    'media-files',
    ['/media/audio.mp3', '/media/video.mp4'],
    {
      title: 'Frontend Masters media files',
      icons: [{
        src: '/media/thumb.png',
        sizes: '800x800',
        type: 'image/png'
      }]
    }
  )
});