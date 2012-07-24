###
Generate doc comments from CoffeeScript source files.
###


fs = require "fs"
path = require "path"

# Walk the tree whose root is the given path, applying the given function to
# each file.
walk = ( directory, fn ) ->
  files = fs.readdirSync directory
  for file in files
    filePath = path.join directory, file
    fn filePath
    walk filePath if fs.statSync( filePath ).isDirectory()


class DocsExtractor

  constructor: ( regexes ) ->
    @regexClassName = regexes.className
    @regexComments = regexes.comments
    @regexCommentText = regexes.commentText

  extract: ( source ) ->
    className: @controlClassName source
    comments: @controlComments source

  # Return the name for the control class defined in the CoffeeScript source text.
  controlClassName: ( source ) ->
    match = @regexClassName.exec source
    if match?
      match[1]
    else
      null

  # Return the comments found for members defined in the CoffeeScript source text.
  controlComments: ( source ) ->
    comments = {}
    match = @regexComments.exec source
    console.log match
    while match != null
      [ full, commentBlock, identifier ] = match
      comments[ identifier ] = @commentText commentBlock
      match = @regexComments.exec source
    comments

  # Remove the "  # " found at the start of a CoffeeScript block comment.
  commentText: ( commentBlock ) ->
    text = ""
    match = @regexCommentText.exec commentBlock
    while match != null
      [ full, lineText ] = match
      if lineText.length == 0
        text += "\n\n"
      else
        if text.length > 0 and text[ text.length - 1 ] != "\n"
          text += " "
        text += lineText
      match = @regexCommentText.exec commentBlock
    text


# Extracts docs from CoffeeScript controls
coffeeDocsExtractor = new DocsExtractor
  className: ///
    \r?\n                     # Start of line (no indentation)
    class                     # "class" keyword
    \s+                       # whitespace
    (?:window.)?              # optional "window."
    (                         # Group captures class name
      [a-zA-Z0-9\$][\w]+      # JavaScript identifier
    )
  ///
  comments: ///
    (                         # First group captures the comment
      (?:                     # Non-capturing group
        \r?\n\x20\x20# .*     # A comment line indented two spaces
      )
      +                       # Any number of comment lines
    )
    \r?\n\x20\x20             # Identifier line indented two spaces
    (                         # Second group captures the identifier
      [a-zA-Z0-9\$][\w]+      # JavaScript member identifier
    )
    :                         # Colon terminates identifier
  ///g
  commentText: /\r?\n  # (.*)/g


# Extracts docs from QuickUI markup controls
markupDocsExtractor = new DocsExtractor
  className: ///
    <script>                  # Opening script tag
    \s*                       # whitespace
    (\w*)                     # First group captures class name
    .prototype.extend\(       # Call to extend prototype
    \s*{                      # Open curly brace
    (                         # Second group captures script contents
      [\s\S]*                 # Anything, including newlines
    )
    }                         # Close curly brace
    \s*\)                     # Close call to extend prototype
    [\s\S]*                   # Anything, including newlines
    </script>                 # Closing script tag
  ///
  comments: ///
    \s*/\*\s*\n               # First line of a JavaScript block comment
    (                         # First group captures the comment
      (?:\s*\*.*\n)*          # An interior line in a block comment
    )
    \s*\*/\s*\n               # Last line of a block comment
    \s*                       # whitespace
    (                         # Second group captures the identifier
      [a-zA-Z0-9\$][\w]+      # JavaScript member identifier
    )
    :                         # Colon terminates identifier
  ///g
  commentText: /(.*)/


extractors =
  ".coffee": coffeeDocsExtractor
  ".qui": markupDocsExtractor


# Return the documentation for all CoffeeScript files below the given root.
projectDocs = ( root ) ->
  docs = {}
  walk root, ( filePath ) ->
    extension = path.extname filePath
    extractor = extractors[ extension ]
    if extractor?
      source = fs.readFileSync filePath
      { className: className, comments: comments } = extractor.extract source
      if className?
        docs[ className ] = comments
  docs


printDocs = ( docs ) ->
  json =  JSON.stringify docs, null, "  "
  js = """
    /* Control member documentation generated from QuickUI control source files. */
    var controlDocumentation = #{json};
  """
  console.log js


# Main
args = process.argv.splice 2 # Ignore "node" and script name args
root = if args[0]? then path.resolve args[0] else process.cwd()
docs = projectDocs root
printDocs docs