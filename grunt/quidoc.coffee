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

  constructor: ( @regexes ) ->

  extract: ( source ) ->
    className = @controlClassName source
    baseClass = @baseClass source
    members = @memberComments source
    requiredClasses = @requiredClasses source
    results = { className }
    if baseClass? and baseClass != "Control"
      results.baseClass = baseClass
    if members?
      results.members = members
    if requiredClasses?
      results.requiredClasses = requiredClasses
    results

  # Return the name for the control class defined in the source text.
  baseClass: ( source ) ->
    match = @regexes.baseClass.exec source
    match?[1]

  # Remove the comment indicator (e.g., "*") on interior block comment lines.
  commentText: ( commentBlock ) ->
    text = ""
    commentLines = @_matches @regexes.commentText, commentBlock
    for commentLine in commentLines
      if commentLine.length > 0
        text += "\n"
      text += commentLine
    text

  # Return the text used to define the control's content and other property
  # setters invoked on the base class.
  content: ( source ) ->
    match = @regexes.content.exec source
    if match?
      # Return the first non-empty form of content which matched
      for i in [1..match.length]
        if match?[i]
          return match?[i]

  # Return the name for the control class defined in the source text.
  controlClassName: ( source ) ->
    match = @regexes.className.exec source
    match?[1]

  # Return the array of other control classes explicitly required by this class.
  explicitRequiredClasses: ( source ) ->
    match = @regexes.explicitClasses.exec source
    if match?
      classes = JSON.parse match[1] # Parse the text into a real array
      @_unique classes

  # Return the array of other control classes implicitly required by this class
  # because they're used in the class' content or other base class setters.
  implicitRequiredClasses: ( source ) ->
    content = @content source
    if content
      implicitClasses = @_matches @regexes.implicitClasses, content
      @_unique implicitClasses

  # Return the comments found for members defined in the source text.
  memberComments: ( source ) ->
    comments = null
    match = @regexes.comments.exec source
    while match != null
      [ full, commentBlock, identifier ] = match
      commentText = @commentText commentBlock
      if commentText.length > 0
        comments = comments || {}
        comments[ identifier ] = commentText
      match = @regexes.comments.exec source
    comments

  # Return the array of classes both implicitly and explicitly required.
  requiredClasses: ( source ) ->
    implicit = ( @implicitRequiredClasses source ) ? []
    explicit = ( @explicitRequiredClasses source ) ? []
    requiredClasses = implicit.concat explicit
    unique = @_unique requiredClasses
    unique.sort()
    if unique.length > 0 then unique else null

  # Return the first capture group for each match of a regex against source text.
  _matches: ( regex, source ) ->
    matches = []
    match = regex.exec source
    while match?
      matches.push match[1]
      match = regex.exec source
    matches

  # Return the given array with duplicates removed.
  _unique: (array) ->
    results = []
    for item in array
      results.push item if results.indexOf( item ) < 0
    results

# Extracts docs from CoffeeScript controls
coffeeDocsExtractor = new DocsExtractor
  baseClass: ///
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
  content: ///
    \r?\n                     # Start of a line
    \s\s                      # Required indent of two spaces
    inherited                 # Expected identifier "inherited"
    :                         # Colon
    (                         # Group captures content (and other base setters)
      (?:                     # Non-capturing group for each line of content
        \r?\n                 # Line break
        \s\s\s\s              # Required indent of at least four spaces
        .*                    # Additional whitespace and/or real content
      )+
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
  explicitClasses: ///
    _requiredClasses          # Expected identifer "_requiredClasses:"
    :                         # Colon
    \s+                       # Whitespace
    (                         # Group captures array of required classes
      \[                      # Opening bracket
        [^\]]+                # Array contents -- everything but a closing bracket
      \]                      # Closing bracket
    )
  ///
  implicitClasses: ///
    \r?\n                     # Start of a line
    \s+                       # Whitespace
    control                   # Expected identifer "control"
    :                         # Colon
    \s+                       # Whitespace
    "                         # Open quote
    (                         # Group captures referenced class name
      \w+                     # Class name
    )
    "                         # Close quote
  ///g


# Extracts docs from QuickUI markup controls
markupDocsExtractor = new DocsExtractor
  baseClass: ///
    <prototype>               # Opening prototype tag
    \s*                       # Optional whitespace
    <                         # Open tag for base class instance
    (\w+)                     # Group captures base class name
  ///
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
  content: ///
    (?:                       # Non-capturing group for first part of OR
      <prototype>             # Opening prototype tag
      \s*                     # Optional whitespace
      <[^>]+>                 # Opening base class instance tag
      (                       # Group captures content
        [\s\S]*               # Anything up to...
      )
      </prototype>            # Closing prototype tag
    )
    |                         # OR
    (?:                       # Non-capturing group for second part of OR
      <content>               # Opening content tag
      (                       # Group captures content
        [\s\S]*               # Anything up to...
      )
      </content>              # Closing content tag
    )
  ///
  explicitClasses: ///
    _requiredClasses          # Expected identifer "_requiredClasses:"
    :                         # Colon
    \s+                       # Whitespace
    (                         # Group captures array of required classes
      \[                      # Opening bracket
        [^\]]+                # Array contents -- everything but a closing bracket
      \]                      # Closing bracket
    )
  ///
  implicitClasses: ///
    <                         # Start tag
    (                         # Group captures referenced class name
      [A-Z]                   # Must start with an uppercase letter
      \w*                     # More letters
    )
    .*                        # Optional tag parameters
    >                         # End tag
  ///g


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
      className = controlDocs.className
      if className?
        # Don't need two copies of class name in JSON output
        delete controlDocs.className
        docs[ className ] = controlDocs
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
