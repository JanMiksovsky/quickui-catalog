###
Build QuickUI Catalog with Grunt.
### 
module.exports = ->

  @loadNpmTasks "grunt-contrib-coffee"
  @loadNpmTasks "grunt-contrib-concat"
  @loadNpmTasks "grunt-contrib-less"
  @loadNpmTasks "grunt-contrib-uglify"
  @loadTasks "grunt"
  sortDependencies = require "sort-dependencies"
  
  @initConfig
    pkg: @file.readJSON "package.json"

    coffee:
      controls:
        files:
          "controls/controls.js": sortDependencies.sortFiles "controls/*.coffee"
        options:
          bare: true
      test:
        files:
          "test/unittests.js": "test/*.coffee"
      # Build the quidoc Grunt task itself. 
      tools:
        files:
          "grunt/quidoc.js": "grunt/quidoc.coffee"

    concat:
      js:
        src: [
          "controls/intro.js"      # Start of function wrapper
          "controls/controls.js"
          "controls/outro.js"      # End of function wrapper.
        ]
        dest: "quickui.catalog.js"
      css:
        src: [ "controls/intro.css", "controls/controls.css" ]
        dest: "quickui.catalog.css"
      demoJs:
        src: [ "docs/*/*.js" ]
        dest: "docs/demos.js"
      demoCss:
        src: [ "docs/*/*.css" ]
        dest: "docs/demos.css"

    less:
      controls:
        files:
          "controls/controls.css": sortDependencies.sortFiles "controls/*.less"
    
    # quidoc CoffeeScript tool needs to be built via coffee task 
    quidoc:
      controls:
        src: [ "controls" ]
        dest: "docs/controlDocumentation.js"

    uglify:
      dist:
        files:
          "quickui.catalog.min.js": "quickui.catalog.js"
  
  @registerTask "default", [ "coffee", "less", "concat" ]
  @registerTask "all", [ "coffee:tools", "default", "quidoc", "uglify" ]
