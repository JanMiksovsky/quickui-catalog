###
A simple text-based log.
This can be used, e.g., for displaying the text output of ongoing processes.
###

class window.Log extends Control

  clear: ->
    this.content ""

  tag: "pre"

  write: ( s ) ->
    content = this.content()
    if content.length == 0
      content = ""
    this.content content + s

  writeln: ( s ) ->
    s = s ? ""
    this.write s + "\n"