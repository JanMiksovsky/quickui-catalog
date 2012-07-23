###
Generate doc comments from CoffeeScript source files.
###

regexCommentedMembers = ///
  (                         # First group captures the comment
    (?:                     # Non-capturing group
      \r?\n\x20\x20# .*     # A comment line indented two spaces
    )
    +                       # Any number of comment lines
  )
  \r?\n\x20\x20             # Identifier line indented two spaces
  (                         # Second group captures the identifier
    [a-zA-Z0-9$][\w]+       # JavaScript member identifier
  )
  :                         # Colon terminates identifier
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

source2 = fs.readFileSync "c:/Source/quickui-catalog/coffee/LateralNavigator.coffee", "utf8"

console?.log docComments source2

###
#regex = /((?:\n\x20\x20# .*)+)\n\x20\x20([a-zA-Z0-9$][\w]+):/gm
regex = /((?:\r?\n\x20\x20# .*)+)\r?\n\x20\x20([a-zA-Z0-9$][\w]+):/g
text = source2
match = regex.exec text
while match != null
  [ full, capture ] = match
  console?.log "<#{capture}>"
  match = regex.exec text
###