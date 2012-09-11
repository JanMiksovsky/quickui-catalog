jsdom = require "jsdom"
document = jsdom.jsdom "<html><body></body></html>", jsdom.level( 1, "core" )
window = document.createWindow()

$ = jQuery = require "jquery"

# Directly load the QuickUI runtime
fs = require "fs"
eval fs.readFileSync( "../quickui/src/quickui.js" ).toString()

# Since QuickUI code generally expects Control to be a global
Control = window.Control

$body = $ "body"
$body.append Control.create "Hello"
console?.log $body.html()
