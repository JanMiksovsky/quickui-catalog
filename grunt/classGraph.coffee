jsdom = require "jsdom"
document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'))
window = document.createWindow()

jQuery = require "jquery"
$ = jQuery

# Directly load the QuickUI runtime
fs = require "fs"
eval fs.readFileSync( "../quickui/src/quickui.js" ).toString()

$body = $ "body"
$body.append Control.create "Hello"
console?.log $body.html()

# bar = require "./bar.js"
# console?.log bar.bar
