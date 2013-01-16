###
Conditionally shows contents if the given browser is in use. 
###

class window.BrowserSpecific extends Control

  # Content to show if none of the specified browsers apply.
  default: Control.property()
  
  initialize: ->
    content = undefined
    if Control.browser.mozilla
      content = @mozilla()
    else if Control.browser.msie
      content = @msie()
    else if Control.browser.opera
      content = @opera()
    else if Control.browser.webkit
      content = @webkit()
    if content is undefined
      content = @default()
    @content content

  # Content to show to Mozilla (Firefox) users.
  mozilla: Control.property()

  # Content to show to Microsoft Internet Explorer users.
  msie: Control.property()

  # Content to show to Opera users.
  opera: Control.property()

  # Content to show to WebKit (Chrome, Safari) users.
  webkit: Control.property()
