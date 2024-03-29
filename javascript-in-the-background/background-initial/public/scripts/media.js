
// Media playing
document.getElementById("btnPlay").addEventListener("click", event => {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Too Much Funk',
        artist: 'Steve Oaks',
        album: 'Greatest Hits',
        artwork: [{
            src: '/media/thumb.png',
            sizes: '800x800',
            type: 'image/png'
        }]
    })
    document.querySelector("audio").play();
    
});
document.getElementById("btnStop").addEventListener("click", event => {
    document.querySelector("audio").pause();    
});

// PiP
document.getElementById("btnPiP").addEventListener("click", event => {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
        document.querySelector("video").requestPictureInPicture();
    }
});
