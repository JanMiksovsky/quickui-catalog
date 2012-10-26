This is the source for the QuickUI Catalog at http://quickui.org/catalog.

The source for the controls in that catalog are written in two ways:

1. Newer controls are written in CoffeeScript and LESS.
2. Older controls are written in QuickUI markup, an HTML flavor that permits
   the use of custom tags. The plan is to eventually transition all controls
   to CoffeeScript.

The outputs of two separate build processes are combined to create the top-level
quickui.catalog.js and .css files. Those files can be directly included in any
project that wants to use the QuickUI Catalog controls.

The /docs folder contains the documentation for the catalog controls, including
the source for any demos and samples. It's this documentation that gets posted
to http://quickui.org/catalog.

Build
-----
1. Install prerequisites:

  ```
  npm install
  ```

  Until the transition from markup to CoffeeScript is complete, one of the
  prerequisites (the QuickUI markup compiler, see above) requires .NET. The
  compiler works fine on Macs as long as Mono (http://www.mono-project.com) is
  installed.

2. Build with Grunt:

  ```
  grunt
  ```
