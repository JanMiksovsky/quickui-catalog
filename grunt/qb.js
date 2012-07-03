/*
 * QuickUI Markup compiler support for Grunt.
 */
module.exports = function( grunt ) {

    grunt.registerMultiTask( "qb", "Compile QuickUI Markup", function() {
        var done = this.async();
        var path = this.data.path;
        var args = {
          cmd: "qb",
          args: [ path ]
        };
        grunt.helper( "exec", args, function( err, stdout, code ){
            if ( err ) {
                grunt.log.writeln( "qb failed" );
            } else {
                grunt.log.writeln( "Compiled " + path + "." ); 
            }
            done( !err );
        });
    });

}