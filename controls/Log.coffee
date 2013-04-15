###
A simple text-based log.
This can be used, e.g., for displaying the text output of ongoing processes.
###

class window.Log extends Control

  inherited:
    content: [
      html: "pre", ref: "Log_content"
    ]

  clear: ->
    this.content ""

  content: Control.chain "$Log_content", "content"

  write: ( s ) ->
    content = this.content()
    if content.length == 0
      content = ""
    this.content content + s
    # Force bottom of content into view.
    @scrollTop @$Log_content().outerHeight()

  writeln: ( s ) ->
    s = s ? ""
    this.write s + "\n"