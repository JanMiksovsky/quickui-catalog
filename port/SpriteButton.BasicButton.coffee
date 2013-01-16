###
A button that uses CSS image sprites for its background. 
###

class window.SpriteButton extends BasicButton

  inherited:
    content: [
      control: "Sprite"
      ref: "backgroundLeft"
    ,
      control: "Sprite"
      ref: "backgroundRight"
    ,
      html: "<div />"
      ref: "SpriteButton_content"
    ]
    generic: "false"

  # The height of the sprite image, in pixels.
  cellHeight: Control.chain( "css/height", ( value ) ->
    @_sprites().cellHeight value
  )
  
  content: Control.chain "$SpriteButton_content", "content"

  # The sprite image.
  image: Control.chain "_sprites", "image"

  _renderButtonState: ( buttonState ) ->
    @_sprites().currentCell buttonState

  _sprites: Control.chain "children", "filter/.Sprite", "cast"

