###
A button that uses CSS image sprites for its background. 
###

window.SpriteButton = BasicButton.sub(
  className: "SpriteButton"
  inherited:
    content: [" ",
      control: "Sprite"
      ref: "backgroundLeft"
    , " ",
      control: "Sprite"
      ref: "backgroundRight"
    , " ",
      html: "<div />"
      ref: "SpriteButton_content"
    , " "]
    generic: "false"
)
SpriteButton::extend

  # The height of the sprite image, in pixels.
  cellHeight: Control.chain("css/height", (value) ->
    @_sprites().cellHeight value
  )
  content: Control.chain("$SpriteButton_content", "content")

  # The sprite image.
  image: Control.chain("_sprites", "image")
  _renderButtonState: (buttonState) ->
    @_sprites().currentCell buttonState

  _sprites: Control.chain("children", "filter/.Sprite", "cast")

