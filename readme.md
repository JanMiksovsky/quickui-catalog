This is the source for the QuickUI Catalog.

The /quickui.catalog folder contains the source for the catalog controls. These
controls are written in two ways:

1. Newer controls are written in CoffeeScript and LESS.
2. Older controls are written in QuickUI markup (http://github.com/JanMiksovsky/quickui-markup).

The plan is to eventually transition all these controls to plain JavaScript
and/or CoffeeScript.

The output from both processes above are combined to create the top-level
quickui.catalog.js and .css files. Those files can be directly included in any
project that wants to use the QuickUI Catalog controls.

The /docs folder contains the documentation for the catalog controls,
including the source for any demos and samples. The documentation gets posted
to http://quickui.org/catalog. Before posting, the "mkdocs" script should be
run to generate control member documentation from the .qui sources.
