# Conditionally shows contents if the given browser is in use. 
BrowserSpecific = Control.sub(className: "BrowserSpecific")
BrowserSpecific::extend
  
  #
  #     * Content to show if none of the specified browsers apply.
  #     
  default: Control.property()
  initialize: ->
    content = undefined
    if Control.browser.mozilla
      content = @mozilla()
    else content = @msie()  if Control.browser.msie
    content = @opera()  if Control.browser.opera
    content = @webkit()  if Control.browser.webkit
    content = this["default"]()  if content is `undefined`
    @content content

  
  #
  #     * Content to show to Mozilla (Firefox) users.
  #     
  mozilla: Control.property()
  
  #
  #     * Content to show to Microsoft Internet Explorer users.
  #     
  msie: Control.property()
  
  #
  #     * Content to show to Opera users.
  #     
  opera: Control.property()
  
  #
  #     * Content to show to WebKit (Chrome, Safari) users.
  #     
  webkit: Control.property()

