/*
 * QuickUI Markup compiler support for Grunt.
 */
module.exports = function( grunt ) {

    var child_process = require( "child_process" );

    grunt.registerHelper( "exec", function( opts, done ) {
        var command = opts.cmd + " " + opts.args.join( " " );
        child_process.exec( command, opts.opts, function( code, stdout, stderr ) {
            if( !done ){
                return;
            }
            if( code === 0 ) {
                done( null, stdout, code );
            } else {
                done( code, stderr, code );
            }
        });
    });
    
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