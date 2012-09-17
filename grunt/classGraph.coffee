###
Given a database of control documentation, output a GraphViz DOT graph
representing the relationship between control classes.
###


fs = require "fs"
path = require "path"

# Return the unique members of the array.
unique = (array) ->
  results = []
  for item in array
    results.push item if results.indexOf( item ) < 0
  results

# Return a GraphViz Dot representation of the documented classes. Each item
# in the documentation dictionary has a baseClass property referencing its
# base class, and a requiredClasses property holding an array of classes either
# explicitly or implicitly required by the control class
dotGraph = ( documentation ) ->
  
  output = "digraph Classes {\n    rankdir=BT;\n"
  output += "    node [style=filled,fillcolor=\"#fafafa\",color=\"#d0d0d0\",fontname=\"Tahoma\"];\n"
  output += "    edge [color=\"#303030\"];\n"

  nodes = []
  for className, controlDocumentation of documentation
    if controlDocumentation.baseClass?
      nodes.push className
      nodes.push controlDocumentation.baseClass
      output += "    " + className + " -> " + controlDocumentation.baseClass + ";\n"
    if controlDocumentation.relatedClasses?
      for relatedClass in controlDocumentation.relatedClasses
        nodes.push className
        nodes.push relatedClass
        output += "    " + className + " -> " + relatedClass + " [style=dotted,color=\"#606060\"];\n"

  for node in unique nodes
    output += "    " + node + " [URL=\"http://quickui.org/catalog/\\N\"]\n"

  output += "}"
  output


# Handle direct invocation via node.
scriptPath = process.argv[1]
if path.basename( scriptPath ) == "classGraph.js"
  docFile = fs.readFileSync( "docs/controlDocumentation.js" ).toString()
  eval docFile

  # Remove classes we don't want to support yet.
  # TODO: Actually move classes we don't want to document elsewhere.
  delete controlDocumentation.ArrayTable
  delete controlDocumentation.Blog
  delete controlDocumentation.BlogPost
  delete controlDocumentation.DictionaryTable

  graph = dotGraph controlDocumentation
  console.log graph
