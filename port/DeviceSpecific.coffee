###
Load different content, control class, or styles depending on the type of device. 
###

class window.DeviceSpecific extends Control

  inherited:
    content: [
      html: "<div/>"
      ref: "placeholder"
    ]

  content: Control.chain "$placeholder", "content"

  # The content to use when the current device is not a mobile device.
  default: Control.property()

  # The class of the control when the current device is not a mobile device.
  defaultClass: Control.property.class()
    
  initialize: ->
    deviceClass = undefined
    deviceClasses = undefined
    deviceContent = undefined
    
    # Determine which content, class, and styles to apply.        
    if DeviceSpecific.isMobile()
      deviceClass = @mobileClass()
      deviceClasses = "mobile"
      deviceContent = @mobile()
    deviceClass = @defaultClass()  if deviceClass is undefined
    deviceContent = this[ "default" ]()  if deviceContent is undefined
    $placeholder = @$placeholder()
    if deviceClass
      
      # Transmute as requested.
      $placeholder = $placeholder.transmute deviceClass, false, true
      
      # Update the placeholder reference so it's the right class.
      @referencedElement "placeholder", $placeholder
    
    # Apply device-specific content.
    $placeholder.content deviceContent  if deviceContent
    
    # Apply device-specific CSS classes.
    $placeholder.addClass deviceClasses  if deviceClasses

  @isMobile: ->
    userAgent = navigator.userAgent
    userAgent.indexOf( "Mobile" ) >= 0 and userAgent.indexOf( "iPad" ) < 0

  # The content to use when the current device is a mobile device.
  mobile: Control.property()

  # The class of the control when the current device is a mobile device.
  mobileClass: Control.property.class()
