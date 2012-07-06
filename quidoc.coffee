###
regexCommentedMembers = ///
  (\n\x20\x20# .*)+     # Consecutive comment lines indented two spaces
  \n\x20\x20(
    [a-zA-Z0-9$][\w]+   # Class member identifier indented two spaces
    :                   # Colon terminates identifier
  )///
###

fs = require "fs"
path = require "path"

# Walk the tree whose root is the given path, listing all files.
ls = ( directory ) ->
  console.log ""
  console?.log directory + ":"
  files = fs.readdirSync directory
  for file in files
    console?.log file
    filePath = path.join directory, file
    stats = fs.statSync filePath
    if stats.isDirectory()
      ls filePath

args = process.argv.splice 2 # Ignore "node" and script name args
root = if args[0]? then path.resolve args[0] else process.cwd()
ls root
