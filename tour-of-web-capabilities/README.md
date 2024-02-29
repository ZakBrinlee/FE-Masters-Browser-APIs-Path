# Frontend Masters Course

# [A Tour of Web Capabilities](https://frontendmasters.com/courses/device-web-apis/)

## Links
- [Core-Capabilities](#core-capabilities)
- [PWAs](#pwas)
  - [Managing Windows](#managing-windows)

# Core-Capabilities
  - Fetch
  - Web Workers
  - WebAssembly
  - WebSocket
  - WebRTC
  - Web Performance APIs
  - Network Information
  - Device Memory
  - WebOTP
  - Web Crypto

# PWAs
## Managing Windows
  - Can move window to different view locations using older api
  - Can manage multiple windows
## File and URL protocols
  - Can Read files, save and upload
  - URL handling for navigation to PWA and not browser
## Web Share
  - Share content from site to another
  - Data in form of json
    - title, content, files, url etc
## Contact Picker
  - Select from user contacts
## FullScreen
  - Request DOM element to enter fullscreen
  - Can enter, exit and add event listener
## Payment Requests
  - Browser acts as the intermediary between User & Payment Proccessor (3rd party like Stripe)

# Helpful Tips
## Get Installed Related Apps
  - Check to see if an app is installed using domain package id
    - Android only
  - Smart App Banner using meta tag
    - iOS and iPadOS only for AppStore apps
## App badging
  - Allows a number to express something is new
    - Showing number is not guarenteed
  - IOS -> only after a push notification
## App Shortcuts
  - installed apps only, Desktop + android only
  - long press or right click
    - each item will open a different URL within PWA
  - Declared in app manifest
    - Has to be rebuild/new to make changes


# Experimental + New Capabilities
 - EyeDropper
 - Compression Streams
 - WebGPU
 - View Transitions APIs
 - Compute Pressure
 - Popover
 - Digital Goods API
 - Web Transport
 - Picture in Picture
 - Presentation
 - Screen Recorder
 - + many more