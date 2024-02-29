# Frontend Masters Course

# [Web Components](https://frontendmasters.com/courses/web-components/)

## What will be covered
- Start with a web app
- Add Installation
- Set up Icons
- Enhance the UI
- Add a Service Worker
- Make an offline experience
- Installation Support
- App Store

## Links
- [Two-Up custom element](https://github.com/GoogleChromeLabs/two-up) - awesome library for two image comparison with slider
- [generic-components](https://genericcomponents.netlify.app/) - A collection of generic web components with a focus on:
-- Accessiblity
-- Easy to use
-- Easy to style
- [Awesome Standalones](https://github.com/davatron5000/awesome-standalones) - A curated list of awesome framework-agnostic standalone web components
- [All the Ways to Make a Web Component](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) - Compare coding style, bundle size and performance of 61 different ways to make a Web Component.


## Intro to Web Components
- Definition
-- Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.
- Web Components are a set of Web Standards
-- <template> and <slot> elements
-- Custom Elements
-- Shadow DOM
-- ES Modules
- Recap
-- Easy as HTML
-- Great reusability
-- Better experiences
-- Progressibely enhanced
-- No build tools
-- "Encapsulated"

## DOM
- Light DOM and Shadow DOM
-- If you did not write the component, you cannot style it
-- Unable to style a shadow dom component
- Shadow DOM CSS
-- Able to style with double linking the style sheet to override CSS with global classes
- Pre-Defined themes are another way to offer variations of components for users to utilize rather than hacky overrides
- Named Shadow Parts allow you to reach deep into a component and style pre-defined parts
- `:host` lets you target the host element for the custom element
- `:host-context()` lets target the `:host` element base on it's parent content
- `::slotted()` targets slotted content but limited to one level
- `:defined` allows control of fallback experiences

## JS Libraries
- `connectedCallBack()` -> componentDidMount
- `disconnectedCallBack()` -> componentWillMount
- `attributeChangeCallBack()` -> old and new value injection
- To create a Shadow DOM you need to clone `<template` and use it's content
- Recap
-- Web Components have a Lifecycle
-- Web Component libraries make writing WC easier
-- Many different flavors of WC
-- Even some JS frameworks can import/exprot WC
