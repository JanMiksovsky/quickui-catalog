/*
 * Grunt file to build the QuickUI Catalog.
 */

module.exports = function(grunt) {

    grunt.loadNpmTasks( "grunt-contrib-coffee" );
    grunt.loadNpmTasks( "grunt-contrib-less" );
    grunt.loadTasks( "grunt" );

    var sortDependencies = require( "sort-dependencies" );

    // Project configuration.
    grunt.initConfig({
        coffee: {
            controls: {
                files: {
                    "controls/controls.js": sortDependencies.sortFiles( "controls/*.coffee" )
                },
                options: {
                    bare: true
                }
            },
            test: {
                files: {
                    "test/unittests.js": "test/*.coffee"
                }
            },
            // samples: {
            //     src: [ "samples/*.coffee" ],
            //     dest: ""
            // },
            /* Build the quidoc Grunt task itself. */
            tools: {
                files: {
                    "grunt/quidoc.js": "grunt/quidoc.coffee"
                }
            }
        },
        concat: {
            js: {
                src: [
                    "controls/intro.js",         // Start of function wrapper
                    "controls/controls.js",
                    "controls/outro.js"          // End of function wrapper.
                ],
                dest: "quickui.catalog.js"
            },
            css: {
                src: [
                    "controls/intro.css",
                    "controls/controls.css",
                ],
                dest: "quickui.catalog.css"
            },
            demoJs: {
                src: [ "docs/*/*.js" ],
                dest: "docs/demos.js"
            },
            demoCss: {
                src: [ "docs/*/*.css" ],
                dest: "docs/demos.css"
            }
        },
        less: {
            controls: {
                files: {
                    "controls/controls.css": sortDependencies.sortFiles( "controls/*.less" )
                }
            }
        },
        /* quidoc CoffeeScript tool needs to be built via coffee task */
        quidoc: {
            controls: {
                src: [ "controls" ],
                dest: "docs/controlDocumentation.js"
            }
        },
        min: {
            dist: {
                src: [ "quickui.catalog.js" ],
                dest: "quickui.catalog.min.js"
            }
        }
    });

    // Default task.
    grunt.registerTask( "default", "coffee less concat" );

    grunt.registerTask( "all", "coffee:tools default quidoc" );
    
};
