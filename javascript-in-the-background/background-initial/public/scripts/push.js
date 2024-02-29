if ("showNotification" in ServiceWorkerRegistration.prototype) {
    // Push is available, enable element
    document.getElementById("push").style.display = 'block';
}

document.getElementById("btnPushSubscribe").addEventListener("click", async event => {
    if ("showNotification" in ServiceWorkerRegistration.prototype) {
        const state = await Notification.requestPermission()

        if (state === 'granted') {
            // we can request push subscription
            const swReg = await navigator.serviceWorker.ready;
            const details = await swReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BLytk-SM-uKxUQkIU8iW8mLkz9ayiBWBVvxnwiIY5SW8YHNodlA641CDslpEdQKuQ6Q5_v4awj5Tnp7v4RdaliM'
            })
            console.log(details)
            fetch('/push/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    endpoint: details.endpoint,
                    keys: {
                        auth: arrayBufferToBase64(details.getKey('auth')),
                        p256dh: arrayBufferToBase64(details.getKey('p256dh'))
                    }
                })
            })
            log('web push subscribed')

        }
    } else {
        log('Web push not available')
    }
});

/*** DATA CONVERSION UTILITIES ***/

function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i=0; i<len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

 // Snippet from https://www.npmjs.com/package/web-push
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}