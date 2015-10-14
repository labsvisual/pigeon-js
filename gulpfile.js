var gulp                = require( 'gulp' );
var uglify              = require('gulp-uglify');
var strip               = require('gulp-strip-comments');
var lines               = require('gulp-remove-empty-lines');
var rename              = require("gulp-rename");

gulp.task( 'production', function() {

    gulp.src( 'src/**/*.js' )
        .pipe( uglify() )
        .pipe( rename( "pigeon.min.js" ) )
        .pipe( gulp.dest( 'dist' ) );

} );

gulp.task( 'development', function() {

    gulp.src( 'src/**/*.js' )
        .pipe( strip() )
        .pipe( lines() )
        .pipe( rename( "pigeon.js" ) )
        .pipe( gulp.dest( 'dist' ) );

} );

gulp.task( 'default', [ 'development', 'production' ] );
