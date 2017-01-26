# typewriterJs - Typing Simulation Javascript Module
TypewriterJs is a javascript library that simulates typing text.

<img src="https://dl.dropboxusercontent.com/u/22874695/typist_demo.gif " width="350" >

# Setup

## Browser Setup
For direct browser usage, in your index.html file load the script:

`<script src="path/to/tw.js"></script>`

## CommonJS Setup

If you're using CommonJS or a similar pre-processed setup, load typewriterJs in as a module.

`const tw = require('path/to/tw.js');`

# Usage
Once the library is setup, create a HTML container with a unique Id that you intend to load the typing in. For example,

`<div id="typewriterId"><div>`

Then, in your JavaScript file boot up the typist.

`tw.startTypist('typewriterId', ['Hi, I am the typist', 'Welcome!']);`

## Styling
To style the type, simply style the container defined to hold the text.

# API
### *tw*.startTypist(*containerId*, *contentArr[*, *speed]*);
* containerId
  * The Id of the HTML container intended to be populated with the type.
* contentArr
  * An array of strings that will be typed and erased one at a time.
* speed
  * Optional. The speed in milliseconds that each letter is typed or erased.