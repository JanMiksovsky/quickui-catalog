/*
 * Build catalog with Grunt.js.
 * For now, this just builds unit tests.
 */
module.exports = function(grunt) {

    grunt.loadTasks( "../quickui/grunt" );

    // Project configuration.
    grunt.initConfig({
        coffee: {
            test: {
                src: "test/*.coffee",
                dest: "test/unittests.js"
            }
        },
        watch: {
            test: {
                files: "<config:coffee.test.src>",
                tasks: "coffee:test"
            }
        }
    });

    // Default task.
    grunt.registerTask( "default", "coffee watch" );
    
};
