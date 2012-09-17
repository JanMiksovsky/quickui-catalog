# For now, require use of "graph" command line argument so Grunt won't run this as a task.
if process.argv[2] != "graph"
  return

jsdom = require "jsdom"
document = jsdom.jsdom "<html><body></body></html>", jsdom.level( 1, "core" )
window = document.createWindow()

$ = jQuery = require "jquery"

# Directly load the QuickUI runtime
fs = require "fs"
eval fs.readFileSync( "../quickui/src/quickui.js" ).toString()

console?.log CalendarMonthWithHeadings::className

# Since QuickUI code generally expects Control to be a global
Control = window.Control

# Directly load the catalog
eval fs.readFileSync( "quickui.catalog.js" ).toString()

# $body = $ "body"
# $body.append Control.create "Hello"
# console?.log $body.html()

# class window.Foo extends Control
# class window.Bar extends window.Foo

# Return an array of all global Control classes.
findControlClasses = ->
  classes = []
  for key of window
    value = window[key]
    if $.isFunction(value) and value.prototype instanceof Control
      classes.push value
  classes


# Return a class hierarchy for the given set of classes. This hierarchy object
# is a dictionary mapping each each to its superclass and related classes.
buildClassHierarchy = (classes) ->
  classHierarchy = {}
  $.each classes, (index, classFn) ->
    record = classRecord(classFn)
    
    # Ignore classes that don't have any relationship to other classes.
    if record.superclass or record.relatedClasses
      className = getClassName(classFn)
      classHierarchy[className] = record

  
  # Sort the results.
  sortByKeys classHierarchy

# Return the class hierarchy record for the given class. The returned
# dictionary will indicate the class' superclass and related classes.
classRecord = (classFn) ->
  classFn() # Force compatability check
  record = {}
  
  # Look up superclass.
  superclass = classFn.superclass
  record.superclass = getClassName(superclass)  if superclass and superclass isnt Control
  
  # Get related classes referenced in DOM.
  relatedClasses = []
  if classFn::hasOwnProperty("inherited")
    referencedClasses = classesReferencedInJson(classFn::inherited)
    relatedClasses = relatedClasses.concat(referencedClasses)
  
  # Get class' own list of required classes.
  if classFn::hasOwnProperty("_requiresClasses")
    requiresClasses = classFn::_requiresClasses
    for requiresClass of requiresClasses
      relatedClasses.push getClassName(requiresClasses[requiresClass])
  record.relatedClasses = unique(relatedClasses)
  record

# Returning an array of any classes referenced in the given Control JSON.
classesReferencedInJson = (json) ->
  classes = []
  if $.isArray(json)
    i = 0

    while i < json.length
      classes = classes.concat(classesReferencedInJson(json[i]))
      i++
  else if $.isPlainObject(json)
    for key of json
      value = json[key]
      classFn = undefined
      if key is "control"
        classes.push getClassName(value)
      else if key.substr(key.length - 5) is "Class" and (typeof value is "string" or ($.isFunction(value) and value:: and value::className))
        classes.push getClassName(value)
      else
        classes = classes.concat(classesReferencedInJson(value))
  classes

# Return the name of a class referenced as a function or a string name.
getClassName = (classRef) ->
  classFn = Control.getClass(classRef)
  classFn()
  className = classFn::className
  className

# Return the given array with duplicates removed.
unique = (array) ->
  result = []
  i = 0

  while i < array.length
    value = array[i]
    result.push value  if $.inArray(value, result) < 0
    i++
  result

# Return a copy of the given object with its keys sorted.
sortByKeys = (obj) ->
  keys = []
  for key of obj
    keys.push key  if obj.hasOwnProperty(key)
  sortedKeys = keys.sort()
  sorted = {}
  i = 0

  while i < keys.length
    sorted[keys[i]] = obj[keys[i]]
    i++
  sorted

# Return a GraphViz Dot representation of the given class hierarchy.
dotGraph = (classHierarchy) ->
  output = "digraph Classes {\n    rankdir=BT;\n"
  output += "    node [style=filled,fillcolor=\"#fafafa\",color=\"#d0d0d0\",fontname=\"Tahoma\"];\n"
  output += "    edge [color=\"#303030\"];\n"
  nodes = []
  for className of classHierarchy
    record = classHierarchy[className]
    if record.superclass
      nodes.push className
      nodes.push record.superclass
      output += "    " + className + " -> " + record.superclass + ";\n"
    i = 0
    while i < record.relatedClasses.length
      nodes.push className
      containedClass = record.relatedClasses[i]
      nodes.push containedClass
      output += "    " + className + " -> " + containedClass + " [style=dotted,color=\"#606060\"];\n"
      i++
  nodes = unique(nodes)
  i = 0

  while i < nodes.length
    output += "    " + nodes[i] + " [URL=\"http://quickui.org/catalog/\\N\"]\n"
    i++
  output += "}"
  output


controlClasses = findControlClasses()
classHierarchy = buildClassHierarchy(controlClasses)

# For now, hide undocumented classes.
delete classHierarchy.ArrayTable
delete classHierarchy.Blog
delete classHierarchy.BlogPost
delete classHierarchy.DictionaryTable

graph = dotGraph(classHierarchy)
console.log graph
