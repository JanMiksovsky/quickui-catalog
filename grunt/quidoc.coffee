###
Generate documenation for QuickUI controls.

This scrapes CoffeeScript or QuickUI markup files to extract the following:
* Class name
* Base class name
* Other control classes instantiated (or otherwise used) by this class.
* Public properties/methods and their associated comments.

This tool can be run directly via node, or invoked as a Grunt task.
###

fs = require "fs"
path = require "path"

# Grunt task
module.exports = ( grunt ) ->
  grunt.registerMultiTask "quidoc", "Generate documentation for QuickUI controls", ->
    dest = path.resolve @data.dest
    docs = projectsDocs @data.src
    fs.writeFileSync dest, formatDocs docs

# Walk the tree whose root is the given path, applying the given function to
# each file.
walk = ( directory, fn ) ->
  files = fs.readdirSync directory
  for file in files
    filePath = path.join directory, file
    if fs.statSync( filePath ).isDirectory()
      walk filePath, fn
    else
      fn filePath


class DocsExtractor

  constructor: ( regexes ) ->
    @regexBaseClassName = regexes.baseClassName
    @regexClassName = regexes.className
    @regexComments = regexes.comments
    @regexCommentText = regexes.commentText
    @regexRequiresClasses = regexes.requiresClasses

  extract: ( source ) ->
    baseClassName: @baseClassName source
    className: @controlClassName source
    members: @memberComments source
    requiresClasses: @requiresClasses source

  # Return the name for the control class defined in the source text.
  baseClassName: ( source ) ->
    match = @regexBaseClassName.exec source
    match?[1]

  # Return the name for the control class defined in the source text.
  controlClassName: ( source ) ->
    match = @regexClassName.exec source
    match?[1]

  # Return the comments found for members defined in the source text.
  memberComments: ( source ) ->
    comments = null
    match = @regexComments.exec source
    while match != null
      [ full, commentBlock, identifier ] = match
      commentText = @commentText commentBlock
      if commentText.length > 0
        comments = comments || {}
        comments[ identifier ] = commentText
      match = @regexComments.exec source
    comments

  # Remove the comment indicator (e.g., "*") on interior block comment lines.
  commentText: ( commentBlock ) ->
    text = ""
    match = @regexCommentText.exec commentBlock
    while match != null
      [ full, lineText ] = match
      if text.length > 0
        text += "\n"
      text += lineText
      ###
      lineText = lineText.trim()
      if lineText.length == 0
        text += "\n\n"  # Line of pure whitespace was intended as a break.
      else
        if text.length > 0 and text[ text.length - 1 ] != "\n"
          text += " "
        text += lineText
      ###
      match = @regexCommentText.exec commentBlock
    text

  # Return the array of other control classes required by this class.
  requiresClasses: ( source ) ->
    match = @regexRequiresClasses.exec source
    if match?
      JSON.parse match[1] # Return the parsed array as an array


# Extracts docs from CoffeeScript controls
coffeeDocsExtractor = new DocsExtractor
  baseClassName: ///
    \r?\n                     # Start of line (no indentation)
    class                     # "class" keyword
    \s+                       # Whitespace
    [\w\.]+                   # Class name (handled separately)
    \s+                       # Whitespace
    extends                   # "extends" keyword
    \s+                       # Whitespace
    (                         # Group captures base class name
      [a-zA-Z0-9\$][\w]+      # JavaScript identifier
    )
  ///
  className: ///
    \r?\n                     # Start of line (no indentation)
    class                     # "class" keyword
    \s+                       # Whitespace
    (?:window.)?              # Optional "window."
    (                         # Group captures class name
      [a-zA-Z0-9\$][\w]+      # JavaScript identifier
    )
  ///
  comments: ///
    (                         # First group captures the comment
      (?:                     # Non-capturing group for each comment line
        \r?\n\x20\x20# .*     # A comment line indented two spaces
      )
      +                       # Any non-zero number of comment lines
    )
    \r?\n\x20\x20             # Identifier line indented two spaces
    (                         # Second group captures the identifier
      [a-zA-Z0-9\$][\w]+      # JavaScript member identifier
    )
    :                         # Colon terminates identifier
  ///g
  commentText: /^\s*#[ ]?(.*)/gm
  requiresClasses: ///
    _requiresClasses          # Expected identifer "_requiresClasses"
    :                         # Colon
    \s+                       # Whitespace
    (                         # Group captures array of required classes
      \[                      # Opening bracket
        [^\]]+                # Array contents -- everything but a closing bracket
      \]                      # Closing bracket
    )
  ///


# Extracts docs from QuickUI markup controls
markupDocsExtractor = new DocsExtractor
  className: ///
    <script>                  # Opening script tag
    \s*                       # Whitespace
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
    /\*                       # Start of JavaScript block comment
    \s+                       # Whitespace
    (                         # First group captures the comment
      (?:                     # Non-capturing group for each comment line
        \s+                   
        \*                    # A star
        \s
        .*                    # Contents of the comment line, up to the newline
      )+                      # Any non-zero number of comment lines
    )
    \s+
    \*/                       # End of JavaScript block comment
    \s+                       # Whitespace (including newline)
    (                         # Second group captures the identifier
      [a-zA-Z0-9\$][\w]+      # JavaScript member identifier
    )
    :                         # Colon terminates identifier
  ///g
  commentText: /^\s*\*[ ]?(.*)/gm


extractors =
  ".coffee": coffeeDocsExtractor
  ".qui": markupDocsExtractor


# Return the documentation for all files below the given root.
projectDocs = ( root ) ->
  docs = {}
  walk root, ( filePath ) ->
    extension = path.extname filePath
    extractor = extractors[ extension ]
    if extractor?
      source = fs.readFileSync filePath, "utf8"
      controlDocs = extractor.extract source
      if controlDocs.className?
        docs[ controlDocs.className ] = controlDocs
  docs


# Return the documenation for all files below the given roots.
projectsDocs = ( projects ) ->
  docs = {}
  for project in projects
    root = path.resolve project
    for own key, value of projectDocs root
      docs[ key ] = value
  sortByKeys docs


# Return the given object with its keys sorted.
sortByKeys = ( obj ) ->
  keys = ( key for own key, value of obj )
  sortedKeys = keys.sort()
  sorted = {}
  for key in sortedKeys
    sorted[ key ] = obj[ key ]
  sorted


formatDocs = ( docs ) ->
  json =  JSON.stringify docs, null, "  "
  """
  /* Control documentation generated from QuickUI control source files. */
  var controlDocumentation = #{json};
  """

# Handle direct invocation via node.
scriptPath = process.argv[1]
if path.basename( scriptPath ) == "quidoc.js"
  projects = process.argv.splice 2 # Ignore "node" and script name args
  if projects.length == 0
    projects = [ process.cwd() ] # Handle current folder by default
  docs = projectsDocs projects
  console.log formatDocs docs
