# Frontend Masters Course

# [Javascript in the Background](https://frontendmasters.com/courses/background-javascript/)

Run from a terminal: `cd background-initial`, `npm install`, and `npm start`. Open your browser at http://localhost:4000.

Follow along the workshop to fill the code. The `background-final` folder has the final code.

## What will be covered
- Web App Lifecycle
- Background's Life
- Detection
- Notifications
- Page Visibility API
- Service Workers
- Execution in the Background
- Web Push

## Links
- [PiP Rendering Fun - Demos](https://pip-rendering-fun.netlify.app/) - This is a set of demos to show how non-video content can be rendered in floating PiP windows, mainly by using <canvas> and streams.

## Top Level Notes
- Reasons to execute code in the background
-- Network Requests
-- Sync Data
-- Notify the User
-- Continue pending tasks

## Web App Lifecycle
- What's the background for code execution?
-- No definition for web apps
-- W3C has different definitions for different APIs
-- Many concepts around
--- hide/minimize: in memory and with execution rights
--- suspend/freeze: in memory with no execution rights
--- close/kill/discard: not in memory
- Background: when the user stops or pauses the usage of the web app
-- Why should we care?
--- Improve user experience
--- Save resources
--- Stop timers
--- Abort pending requests
- What happens on mobiles OSs with an app's lifecycle in general?
-- Apps in the background are paused (suspended) -> when more memory is needed, the OS will kill some apps to make space
-- Content can be in memory and running, in memory and paused, or not in memory at all (just screenshot)
- Observing desktop background JS in Windows, macOS, Linux, Chrome OS
-- FPS: disabled, all FPS and animations are paused
-- Timers: Reduced (different by browser)
-- Web Worker Execution -> continues after hidden
-- Service Worker Execution -> continues after hidden

## Background's Life - Service Worker Background API
### Service Worker Background APIs
- Web Push: server can "wake up" code in the background
- Background Sync: notifies the browser that the add has a pending operation to update
- Periodic Background Sync: Informs the browser to periodically update something
- Background Fetch: large data downloads whether the app is in use or not
- Payment Handler: allows a site to pre-authorize a charge that will happen at a later time
-- Chromium -> all are available APIs
-- Safari -> Web Push only, macOS ventura
-- FF -> Web push only

### Background Detection
- PWA lifecycle
-- App Loading -> App goes background (visibility change) -> App might be suspended (Freeze/chrome) -> User goes back into app (resume/visibility change)
-- Chrome provides a boolean property `document.wasDiscarded`
-- use `visibilitychange` event to listen for app lifecycle changes

### Visibility Change Detection
- All platforms can be addressed by listening for the `visibilitychange` event
- `document.visibilityState === hidden` -> last change to save current state
  
### Coding Visibility Change
- `performance.now()` more performant way to get time in JS
- sessionStorage in mobile devices are useless
  
### Freezing Detection
- PageLifecycle API allows the detection of page navigation if frozen or resumed
-- Chromium only
-- Debugging on Chrome: chrome://discards/
- `freeze` event. Last chance to save data
  
### App Change Detection
- `resume`: We are back from suspension
- `DOMContentLoaded`: ability to detect if `document.wasDiscarded` to be able to restore state
- You can save state -> on `visibilitychange`
- When should you restore state?
-- When the page loads
-- Using the saved timestamp you can decide to restore state or start a new navigation
- Mobile has common practice to restore the state

## Service Workers
- A JS file running in it's own thread that will act as a middleware offering a local installed web server or web proxy for your PWA, including resources and API calls
-- Runs client side
-- HTTPS required
-- Installed by web page
-- Acts as a network proxy or local web server
-- Abilities to run in the background
-- No need for user's permission
- Everytime you wake up a SW because of a web push, you must notify the user of a change/notification. If ignored, the browser will generate a default message to the user
### Notifications & UI
- Web Notifications is the only cross-platform solution
-- Requires user's permission. Its the same permission as one for Push messaging
-- Two APIs created for notification
--- Desktop Notification. for windows and workers (Deprecated for chrome/android)
--- Web Push, for Service Workers
### Media Session API
- Special cases for apps playing audio/video in background
-- Picture in Picture API for video
-- Media Session API for metadata
### Media Session & PiP Practice
- No throttling while in PiP
- Same functionality as if it was in the foreground/active tab
### Beacon API
- Network requests aborted if web app goes to background
-- Beacon API (if suitble)
-- Web Background Synchronizataion API
-- Background Fetch API
- BEACON API -> for requests where we don't care about it's response
## Waking Up Background Javascript
- Wake up code client-side while in background/continue executing code after leaving app using
-- Background sync
-- Periodic Background Sync
-- Background Fetch
--- Execution happens in the background. Maybe no PWA page loaded
--- Web Notifications for messaging the user
- Background Sync API
-- PWA Defers a sync action until the device has a stable connection to server
-- A 'sync' event will be fired in SW to handle pending sync
--- immediatly if network is stable
--- later, when network goes back to stable
--- if battery level is good
-- We access network and fulfill the sync or leave it pending'
-- 5% of mobile web apps with a SW are using the API
- Using API steps
-- 1. Register a Background Sync Action
-- 2. Handle the Sync Action, by listening to event and catching the correct tag
- Periodic Background Sync API (CHROME only)
-- PWA asks user for permission to periodicaly execute code in the background
-- a `periodicsync` event will be fired in the SW
--- On a synchronization time interval
--- If battery and network conditions are met
-- We typically access the network on each execution, not mandatory
-- Currently, fired with max of once per 12 hour cycle
- Background Fetch API
-- PWA asks the web engine to make some fetch download requests
-- The browser will download the requests in the background while showing OS notification
-- Events will be fired in the SW when:
--- Download finishes
--- If the user has clicked the notification
--- On abort or failure
--- On Progress

## Push Notifications
- Web Push Notifications
-- PWA asks permission
-- SW can create notification from the background
-- PWA can subscrive the user to Push
-- A push event will be fired in the SW to handle push
-- FF, Chrome, Edge + Samsung internet
-- Safari from macOS 13 (ventura), iOS and iPadOS from some version of 2023
- Good Practice to always request subscription
