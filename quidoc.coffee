###
Generate doc comments from CoffeeScript source files.
###

regexCommentedMembers = ///
  (                     # First group captures the comment
    (?:\n\x20\x20# .*)  # A comment line indented two spaces
    +                   # Any number of comment lines
  )
  \n\x20\x20            # Two spaces at start of identifier line
  (                     # Second group captures the identifier
    [a-zA-Z0-9$][\w]+   # JavaScript member identifier
  )
  :                     # Colon terminates identifier
  ///gm

fs = require "fs"
path = require "path"

# Walk the tree whose root is the given path, applying the given function to
# each file. If a regex is supplied, only names matching that expression are
# listed.
walk = ( directory, regex, fn ) ->
  files = fs.readdirSync directory
  for file in files
    filePath = path.join directory, file
    fn filePath if regex is undefined or regex.test( file )
    walk filePath if fs.statSync( filePath ).isDirectory()


docComments = ( source ) ->
  console?.log source
  comments = {}
  match = regexCommentedMembers.exec source
  while match != null
    [ full, memberComment, memberName ] = match
    comments[ memberName ] = memberComment
    match = regexCommentedMembers.exec source
  comments


###
args = process.argv.splice 2 # Ignore "node" and script name args
root = if args[0]? then path.resolve args[0] else process.cwd()
walk root, /\.coffee$/, ( filePath ) ->
  comments = docComments filePath
  console?.log comments
###

source = """
###
Lets user navigate content by moving left (backward) and right (forward).
###

class window.LateralNavigator extends Control

  inherited:
    content:
      control: HorizontalPanels
      ref: "panels"
      content:
        html: "div"
        ref: "LateralNavigator_content"
      leftClass: "VerticalAlign"
      left:
        control: BasicButton
        ref: "LateralNavigator_previousButton"
        class: "flat navigatorButton quiet"
        content: "&#9664;"
      rightClass: "VerticalAlign"
      right:
        control: BasicButton
        ref: "LateralNavigator_nextButton"
        class: "navigatorButton quiet"
        content: "&#9654;"
      tabindex: -1 # To get keyboard events
    generic: true

  # True if it's possible to navigate forward.
  # The default implementation always returns true. Subclasses can override this
  # to provide custom logic.
  canGoNext: -> true

  # True if it's possible to navigate backward.
  # The default implementation always returns true. Subclasses can override this
  # to provide custom logic.
  canGoPrevious: -> true

  # The content for the current position in the sequence.
  content: Control.chain( "$LateralNavigator_content", "content", ->
    @_updateButtons()
  )

  # The control class used to render the content.
  contentClass: Control.property.class ( contentClass ) ->
    $new = @$LateralNavigator_content().transmute contentClass, true
    @referencedElement "LateralNavigator_content", $new

  initialize: ->
    @$LateralNavigator_previousButton().click => @_previousClick()
    @$LateralNavigator_nextButton().click => @_nextClick()
    @on
      keydown: ( event ) =>
        switch event.which
          when 37 # Left
            if !@$LateralNavigator_previousButton().disabled()
              @_previousClick()
          when 39 # Right
            if !@$LateralNavigator_nextButton().disabled()
              @_nextClick()
      sizeChanged: =>
        # HACK: Shouldn't need to directly reference HorizontalPanel elements.
        this.$panels().$SimpleFlexBox_panel1().checkForSizeChange();
        this.$panels().$SimpleFlexBox_panel2().checkForSizeChange();
    @_updateButtons()

  # Move forward.
  # The default implementation does nothing.
  next: ->

  # The content of the "Next" button. Default is a right-pointing arrow.
  nextButtonContent: Control.chain "$LateralNavigator_nextButton", "content"

  # True if the Next button should be disabled. Default is false.
  nextButtonDisabled: Control.chain "$LateralNavigator_nextButton", "disabled"

  # Move backward.
  # The default implementation does nothing.
  previous: ->

  # The content of the "Previous" button. Default is a left-pointing arrow.
  previousButtonContent: Control.chain "$LateralNavigator_previousButton", "content"

  # True if the Previous button should be disabled. Default is false.
  previousButtonDisabled: Control.chain "$LateralNavigator_previousButton", "disabled"

  _nextClick: ->
    @next()
    @_updateButtons()
    @trigger "next"

  _previousClick: ->
    @previous()
    @_updateButtons()
    @trigger "previous"

  _updateButtons: ->
    @nextButtonDisabled !@canGoNext()
    @previousButtonDisabled !@canGoPrevious()
"""

source2 = fs.readFileSync "c:/Source/quickui-catalog/coffee/LateralNavigator.coffee", "utf8"

#console?.log docComments source2

#regex = /((?:\n\x20\x20# .*)+)\n\x20\x20([a-zA-Z0-9$][\w]+):/gm
regex = /((\n\x20\x20# .*)+)/gm
match = regex.exec source2
while match != null
  [ full, capture ] = match
  console.log capture
  console.log ""
  match = regex.exec source2