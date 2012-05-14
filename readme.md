This is the source for the QuickUI Catalog.

The /quickui.catalog folder contains the source for the catalog controls.
All controls are currently built with qb, the QuickUI markup compiler, which
can be found in the separate quickui-markup repo. The plan is to eventually
transition all these controls to plain JavaScript and/or CoffeeScript.

The markup compiler creates quickui.catalog.js and .css.
Those files are made available at http://quickui.org/release via the
script in the deploy folder.

The /docs folder contains the documentation for the catalog controls,
including the source for any demos and samples. The documentation gets posted
to http://quickui.org/catalog. Before posting, the "mkdocs" script should be
run to generate control member documentation from the .qui sources.
